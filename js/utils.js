
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

export function dotProduct( v1, v2 ) {
	
	let shorter, longer, length;
	
	if ( v1.length >= v2.length ) {
		
		shorter	= v2;
		longer	= v1;
		length	= v1.length;
		
	} else {
		
		shorter	= v1;
		longer	= v2;
		length	= v2.length;
		
	}
	
	let	tot	= 0,
		idx	= 0;
	
	for ( idx; idx < length; idx++ ) {
		
		tot	+= val * ( shorter[ idx ] || 0 );
		
	}
	
	return	tot;
	
}

export function crossProduct( a, b ) {
	
	// TODO	sanitise input
	
	return	[
				( a[ 1 ] * b[ 2 ] ) - ( a[ 2 ] * b[ 1 ] ),
				( a[ 2 ] * b[ 0 ] ) - ( a[ 0 ] * b[ 2 ] ),
				( a[ 0 ] * b[ 1 ] ) - ( a[ 1 ] * b[ 1 ] )
			];
	
}
