import { getWindowDimensions, multMatrices3x3 } from './utils.js';
import Shape from './Shape.js';
import solids from './solid-defs.js';
import { animateBasic, animate } from './animate.js';


document.addEventListener( 'DOMContentLoaded', evt => {
	
	// TODO	resize handler
	const	dimensions	= getWindowDimensions(),
			{ min }	= dimensions;
	
	
	const	canvas	= document.createElement( 'canvas' ),
			ctx		= canvas.getContext( '2d' );
	
	canvas.width	= ( min / 5 );
	canvas.height	= ( min / 5 );
	document.body.appendChild( canvas );
	
	canvas.style.border			= '2px solid deeppink';
	canvas.style.borderRadius	= "50%";
	
	
	const	shape	= new Shape( solids.tetrahedron );
	
	shape.scale( 100 );
	shape.translate( [ 0, 0, 1000 ] );
	
	drawShape( shape, { ctx, centre: min / 10 } );
	
	let	spinning	= false;
	
	const	offsetX	= canvas.offsetLeft,
			offsetY	= canvas.offsetTop,
			
			cx		= min / 10,
			cy		= min / 10;
	
	canvas.addEventListener( 'pointermove', evt => {
		
		if ( ! spinning ) {
			
			const	x	= ( ( evt.pageX - offsetX ) - cx ),
					y	= ( cy - ( evt.pageY - offsetY ) );
			
			const	[ nx
					, ny ]	= getNormalisedVector(
								evt, 
								canvas.offsetLeft,
								canvas.offsetTop,
								min / 10,
								min / 10
							);
			
			const	matrix	= getRotationMatrix( nx, ny, evt.pressure ? 0.4 : 0.2 );
			
			const	flat	= shape.flat.slice();
			
			shape.matrixRotate( matrix );
			
			drawShape( shape, { ctx, centre: min / 10 } );
			
			shape.flat	= flat;
			
		}
		
	} );
	
	canvas.addEventListener( 'pointerdown', evt => {
		
		if ( ! spinning ) {
			
			const	x	= ( ( evt.pageX - offsetX ) - cx ),
					y	= ( cy - ( evt.pageY - offsetY ) );
			
			const	[ nx
					, ny ]	= getNormalisedVector(
								evt, 
								canvas.offsetLeft,
								canvas.offsetTop,
								min / 10,
								min / 10
							);
			
			const	matrix	= getRotationMatrix( nx, ny, evt.pressure ? 0.4 : 0.2 );
			
			const	flat	= shape.flat.slice();
			
			shape.matrixRotate( matrix );
			
			drawShape( shape, { ctx, centre: min / 10 } );
			
			shape.flat	= flat;
			
		}
		
	} );
	
	canvas.addEventListener( 'pointerup', evt => {
		
		if ( ! spinning ) {
			
			spinning	= true;
			
			const	[ nx
					, ny ]	= getNormalisedVector(
								evt, 
								canvas.offsetLeft,
								canvas.offsetTop,
								min / 10,
								min / 10
							),
					
					matrix	= getRotationMatrix(
								nx,
								ny,
								-0.25
							);
			
			const	flat	= shape.flat.slice();
			
			let	n = 0;
			
			animateBasic( t => {
				
				if ( n++ < 30 ) {
					
					shape.matrixRotate( matrix );
					
					ctx.clearRect( 0, 0, min / 5, min / 5 );
					
					drawShape( shape, { ctx, centre: min / 10 } );
					
				} else {
					
					shape.flat	= flat;
					
					drawShape( shape, { ctx, centre: min / 10 } );
					
					return true;
					
				}
				
			} ).then( t => spinning = false );
			
		}
		
	});
	
} );


function getNormalisedVector( evt, offsetX, offsetY, cx, cy ) {
	
	const	x	= ( ( evt.pageX - offsetX ) - cx ),
			y	= ( cy - ( evt.pageY - offsetY ) ),
			mag	= Math.sqrt( ( x * x ) + ( y * y ) );
	
	return	[ x / mag, y / mag ];
	
}


function getRotationMatrix( x, y, magnitude = 1 ) {
	
	const	yaw		= x ? Math.atan( x ) * magnitude : 0,
			pitch	= y ? Math.atan( y ) * magnitude : 0;
	
	const	sinP	= Math.sin( pitch ),
			cosP	= Math.cos( pitch );
	
	const	sinY	= Math.sin( yaw ),
			cosY	= Math.cos( yaw );
	
	/*
	pitch
	[
		[ 1, 0, 0 ],
		[ 0, cosP, -sinP ],
		[ 0, sinP, cosP ]
	]
	yaw
	[
		[ cosY, 0, sinY ],
		[ 0, 1, 0 ],
		[ -sinY, 0, cosY ]
	]
	combined
	[
		[ cosY, 0, sinY ],
		[ sinP * sinY, cosP, -sinP * cosY ],
		[ -sinY * cosP, sinP, cosP * cosY ]
	]
	*/
	
	return	[
				[ cosY, 0, sinY ],
				[ sinP * sinY, cosP, -sinP * cosY ],
				[ -sinY * cosP, sinP, cosP * cosY ]
			];
	
}


function drawShape( shape, canvas ) {
	// TODO	svg output would be easier to style
	
	const	proj		= shape.get2dProjection( 400/*650*/ ), // TODO calculate the zoom factor
			{ ctx
			, centre }	= canvas;
	
	ctx.clearRect( 0, 0, centre * 2, centre * 2 );
	
	proj.forEach( face => {
		
		const	first	= face.shift();
		
		ctx.beginPath();
		ctx.moveTo( first[ 0 ] + centre, first[ 1 ] + centre );
		
		face.forEach( pt => {
			
			ctx.lineTo( pt[ 0 ] + centre, pt[ 1 ] + centre );
			
		} );
		
		ctx.closePath();
		
		ctx.fillStyle	= 'white';
		ctx.fill();
		
		ctx.strokeStyle	= 'deeppink';
		ctx.lineWidth	= 2;
		ctx.lineJoin	= 'round';
		ctx.stroke();
		
	} );
	
}
