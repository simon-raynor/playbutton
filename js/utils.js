
export function getWindowDimensions() {
	
	try {
		
		const	height	= window.innerHeight,
				width	= window.innerWidth;
		
		return	{
					width	: width,
					height	: height,
					cx		: Math.floor( width / 2 ),
					cy		: Math.floor( height / 2 ),
					min		: Math.min( width, height ),
					max		: Math.max( width, height )
				};		
		
	} catch ( ex ) {
		
		console.error( 'Unable to determine window size' );
		
		throw( ex );
		
	}
	
}


export function multMatrices3x3( a, b ) {
	
	return	[
		[
			( a[ 0 ][ 0 ] * b[ 0 ][ 0 ] )
			+ ( a[ 0 ][ 1 ] * b[ 1 ][ 0 ] )
			+ ( a[ 0 ][ 2 ] * b[ 2 ][ 0 ] ),
			
			( a[ 0 ][ 0 ] * b[ 0 ][ 1 ] )
			+ ( a[ 0 ][ 1 ] * b[ 1 ][ 1 ] )
			+ ( a[ 0 ][ 2 ] * b[ 2 ][ 1 ] ),
			
			( a[ 0 ][ 0 ] * b[ 0 ][ 2 ] )
			+ ( a[ 0 ][ 1 ] * b[ 1 ][ 2 ] )
			+ ( a[ 0 ][ 2 ] * b[ 2 ][ 2 ] )
		],
		[
			( a[ 1 ][ 0 ] * b[ 0 ][ 0 ] )
			+ ( a[ 1 ][ 1 ] * b[ 1 ][ 0 ] )
			+ ( a[ 1 ][ 2 ] * b[ 2 ][ 0 ] ),
			
			( a[ 1 ][ 0 ] * b[ 0 ][ 1 ] )
			+ ( a[ 1 ][ 1 ] * b[ 1 ][ 1 ] )
			+ ( a[ 1 ][ 2 ] * b[ 2 ][ 1 ] ),
			
			( a[ 1 ][ 0 ] * b[ 0 ][ 2 ] )
			+ ( a[ 1 ][ 1 ] * b[ 1 ][ 2 ] )
			+ ( a[ 1 ][ 2 ] * b[ 2 ][ 2 ] )
		],
		[
			( a[ 2 ][ 0 ] * b[ 0 ][ 0 ] )
			+ ( a[ 2 ][ 1 ] * b[ 1 ][ 0 ] )
			+ ( a[ 2 ][ 2 ] * b[ 2 ][ 0 ] ),
			
			( a[ 2 ][ 0 ] * b[ 0 ][ 1 ] )
			+ ( a[ 2 ][ 1 ] * b[ 1 ][ 1 ] )
			+ ( a[ 2 ][ 2 ] * b[ 2 ][ 1 ] ),
			
			( a[ 2 ][ 0 ] * b[ 0 ][ 2 ] )
			+ ( a[ 2 ][ 1 ] * b[ 1 ][ 2 ] )
			+ ( a[ 2 ][ 2 ] * b[ 2 ][ 2 ] )
		]
	];
	
};
