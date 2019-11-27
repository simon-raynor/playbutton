import { multMatrices3x3 } from './utils.js';

export default function Shape( initialPoints ) {
	
	this.flat		= [];
	this._points	= [];
	this._faces		= [];
	
	let	idx	= 0;
	
	initialPoints.forEach( initFace => {
		
		const	ptCount	= initFace.length,
				face	= [];
		
		initFace.forEach( initPt => {
			
			const	point	= [];
			
			initPt.forEach( initDatum => {
				
				point.push( idx );
				this.flat.push( initDatum );
				
				idx++;
				
			} );
			
			this._points.push( point );
			face.push( point );
			
		} );
		
		this._faces.push( face );
		
	} );
	
	this.centre	= findCentre.call( this );
	
}

//
// public methods
//

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
	
	return	matrix;
	
}


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


//
// "private" methods
//

function findCentre() {
	
	const	x	= [],
			y	= [],
			z	= [],
			l	= this._points.length;
	
	this._points.forEach( pt => {
		
		x.push( this.flat[ pt[ 0 ] ] );
		y.push( this.flat[ pt[ 1 ] ] );
		z.push( this.flat[ pt[ 2 ] ] );
		
	} );
	
	return	[
		x.reduce( ( s, n ) => s + n, 0 ) / l,
		y.reduce( ( s, n ) => s + n, 0 ) / l,
		z.reduce( ( s, n ) => s + n, 0 ) / l
	]
	
}
