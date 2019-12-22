import { multMatrices3x3, dotProduct, crossProduct } from './utils.js';

export default function Shape( initialPoints ) {
	
	this.flat		= [];
	this._faces		= [];
	
	let	idx	= 0;
	
	initialPoints.forEach( initFace => {
		
		const	ptCount	= initFace.length,
				face	= [],
				sums	= [0,0,0]
		
		initFace.forEach( initPt => {
			
			const	point	= [];
			
			initPt.forEach( ( initDatum, axisIdx ) => {
				
				point.push( idx );
				this.flat.push( initDatum );
				
				sums[ axisIdx ]	+= initDatum;
				
				idx++;
				
			} );
			
			face.push( point );
			
		} );
		
		// add the centre & normal now so that transforms
		// affect those too (save calculating normal each
		// frame)
		const	normal	= crossProduct(
							[
								this.flat[ face[ 1 ][ 0 ] ] - this.flat[ face[ 0 ][ 0 ] ],
								this.flat[ face[ 1 ][ 1 ] ] - this.flat[ face[ 0 ][ 1 ] ],
								this.flat[ face[ 1 ][ 2 ] ] - this.flat[ face[ 0 ][ 2 ] ]
							],
							[
								this.flat[ face[ 2 ][ 0 ] ] - this.flat[ face[ 0 ][ 0 ] ],
								this.flat[ face[ 2 ][ 1 ] ] - this.flat[ face[ 0 ][ 1 ] ],
								this.flat[ face[ 2 ][ 2 ] ] - this.flat[ face[ 0 ][ 2 ] ]
							]
						);
		
		this.flat.push( normal[ 0 ], normal[ 1 ], normal[ 2 ] );
		face.push([ idx++, idx++, idx++ ]);
		
		const	centre	= [
							sums[ 0 ] / face.length,
							sums[ 1 ] / face.length,
							sums[ 2 ] / face.length
						];
		
		this.flat.push( centre[ 0 ], centre[ 1 ], centre[ 2 ] );
		face.push([ idx++, idx++, idx++ ]);
		
		this._faces.push( face );
		
	} );
	
	this.centre	= findCentre.call( this );
	
}

Object.defineProperty(
	Shape.prototype,
	'faces',
	{
		get() {
			
			return	this._faces.map( face => {
				
				return	face.map( point => {
					
					return	[
						this.flat[ point[ 0 ] ],
						this.flat[ point[ 1 ] ],
						this.flat[ point[ 2 ] ]
					];
					
				} );
				
			} );
			
		}
	}
);

//
// public methods
//

Shape.prototype.translate	= function( vector ) {
	
	this.flat	= this.flat.map( ( n, idx ) => {
		
		const	i = idx % 3;
		
		return	n + vector[ i ];
		
	} );
	
	this.centre	= findCentre.call( this );
	
}

Shape.prototype.scale	= function( factor ) {
	
	this.flat	= this.flat.map( ( n, idx ) => {
		
		const	i = idx % 3;
		
		return	this.centre[ i ] + ( ( n - this.centre[ i ] ) * factor );
		
	} );
	
}

Shape.prototype.rotate	= function( theta ) {
	
	const	[ cx
			, cy
			, cz ]	= this.centre,
			
			[ pitch
			, yaw
			, roll ]	= theta;
	
	let	matrix;
	
	//
	//	build up the 3x3 rotation matrix
	//
	if ( pitch ) { // rotate on x
		
		const	sinP	= Math.sin( pitch ),
				cosP	= Math.cos( pitch );
		
		matrix	= [
					[ 1, 0, 0 ],
					[ 0, cosP, -sinP ],
					[ 0, sinP, cosP ]
				];
		
	}
	
	if ( yaw ) {	// rotate on y
		
		const	sinY	= Math.sin( yaw ),
				cosY	= Math.cos( yaw );
		
		if ( matrix ) {
			
			matrix	= multMatrices3x3(
						matrix,
						[
							[ cosY, 0, sinY ],
							[ 0, 1, 0 ],
							[ -sinY, 0, cosY ]
						]
					);
			
		} else {
			
			matrix	= [
						[ cosY, 0, sinY ],
						[ 0, 1, 0 ],
						[ -sinY, 0, cosY ]
					];
			
		}
		
	}
	
	if ( roll ) {	// rotate on z
		
		const	sinR	= Math.sin( roll ),
				cosR	= Math.cos( roll );
		
		if ( matrix ) {
			
			matrix	= multMatrices3x3(
						matrix,
						[
							[ cosR, -sinR, 0 ],
							[ sinR, cosR, 0 ],
							[ 0, 0, 1 ]
						]
					);
			
		} else {
			
			matrix	= [
						[ cosR, -sinR, 0 ],
						[ sinR, cosR, 0 ],
						[ 0, 0, 1 ]
					];
			
		}
		
	}
	
	return	this.matrixRotate( matrix );
	
}

Shape.prototype.matrixRotate	= function( matrix ) {
	
	const	[ cx
			, cy
			, cz ]	= this.centre;
	
	let x, y, z;
	
	for (
		let	n = this.flat.length,
			i = 0;
		i < n;
		i += 3
	) {
		
		x	= this.flat[ i ] - cx;
		y	= this.flat[ i + 1 ] - cy;
		z	= this.flat[ i + 2 ] - cz;
		
		this.flat[ i ]		= cx + ( x * matrix[ 0 ][ 0 ] ) + ( y * matrix[ 1 ][ 0 ] ) + ( z * matrix[ 2 ][ 0 ] );
		this.flat[ i + 1 ]	= cy + ( x * matrix[ 0 ][ 1 ] ) + ( y * matrix[ 1 ][ 1 ] ) + ( z * matrix[ 2 ][ 1 ] );
		this.flat[ i + 2 ]	= cz + ( x * matrix[ 0 ][ 2 ] ) + ( y * matrix[ 1 ][ 2 ] ) + ( z * matrix[ 2 ][ 2 ] );
		
	}
	
	return	this.flat;
	
}

Shape.prototype.quaternionRotate	= function( quat ) {
	
	const	[ cx
			, cy
			, cz ]	= this.centre;
	
	const	[ qt
			, qx
			, qy
			, qz ]	= quat;
	
	// get the inverse quaternion
	const	qsize	= Math.sqrt( ( qt * qt ) + ( qx * qx ) + ( qy * qy ) + ( qz * qz ) ),
			qsize2	= qsize * qsize,
			[ q1t
			, q1x
			, q1y
			, q1z ]	= [ qt / qsize2, -qx / qsize2, -qy / qsize2, -qz / qsize2 ];
	
	const	cosT	= Math.cos( qt ),
			sinT	= Math.sin( qt );
	
	let pt, px, py, pz;
	
	
	for (
		let	n = this.flat.length,
			i = 0;
		i < n;
		i += 3
	) {
		
		pt	= 0;
		px	= this.flat[ i ] - cx;
		py	= this.flat[ i + 1 ] - cy;
		pz	= this.flat[ i + 2 ] - cz;
		
		const	[ st
				, sx
				, sy
				, sz ]	= [
							( qt * pt ) - ( qx * px ) - ( qy * py ) - ( qz * pz ),
							( qt * px ) + ( qx * pt ) + ( qy * pz ) - ( qz * py ),
							( qt * py ) - ( qx * pz ) + ( qy * pt ) + ( qz * px ),
							( qt * pz ) + ( qx * py ) - ( qy * px ) + ( qz * pt )
						];
		
		this.flat[ i ]		= cx + ( ( st * q1x ) + ( sx * q1t ) + ( sy * q1z ) - ( sz * q1y ) );
		this.flat[ i + 1 ]	= cy + ( ( st * q1y ) - ( sx * q1z ) + ( sy * q1t ) + ( sz * q1x ) );
		this.flat[ i + 2 ]	= cz + ( ( st * q1z ) + ( sx * q1y ) - ( sy * q1x ) + ( sz * q1t ) );
		
	}
	
}

/*
Shape.prototype.get2dProjection	= function( ez = 100) {
	
	return	this.faces.map( face => {
		
		const	retval	= [];
		
		let	zSum	= 0;
		
		face.forEach( points => {
		
			const	[ x, y, z ]	= points;
			
			retval.push(
				[
					( ez / z ) * x,
					( ez / z ) * y,
					z	// keep track of z, it might come in handy I guess
				]
			);
			
			zSum	+= z;
			
		} );
		
		retval.z	= zSum / face.length;
		
		return	retval;
		
	} ).sort( ( a, b ) => b.z - a.z );
	
}
*/
Shape.prototype.get2dProjection	= function( ez = 100) {
	
	const	returning	= [];
	
	this.faces.forEach( face => {
		
		const	centre	= face[ face.length - 1 ],
				normal	= face[ face.length - 2 ];
		
		if ( centre[ 2 ] > normal[ 2 ] ) {// backface culling
			
			returning.push(
				face.map( points => {
					
					const	[ x, y, z ]	= points;
					
					return	[
						( ez / z ) * x,
						( ez / z ) * y,
						z	// keep track of z, it might come in handy I guess
					];
					
				} )
			);
			
		}
		
	} );
	
	return	returning.sort( ( a, b ) => b[ b.length - 1 ][ 2 ] - a[ a.length - 1 ][ 2 ] );;
	
}


//
// "private" methods
//

function findCentre() {
	
	const	sums	= this.faces.reduce( ( retval, face ) => {
						
						const	fCentre	= face[ face.length - 1 ];
						
						return	[
							retval[ 0 ]	+ fCentre[ 0 ],
							retval[ 1 ]	+ fCentre[ 1 ],
							retval[ 2 ]	+ fCentre[ 2 ]
						];
						
					}, [0,0,0] );
	
	return	[
		sums[ 0 ] / this.faces.length,
		sums[ 1 ] / this.faces.length,
		sums[ 2 ] / this.faces.length
	];
	
}

