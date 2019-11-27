const	solids	= {};

export default	solids;


const	PHI	= ( 1 + Math.sqrt( 5 ) ) / 2;


function getOptimisedSolid( def ) {
	
	let	obj	= {},
		// N.B.	can't `push()` into a `Float32Array`
		//		so use a regular one the convert
		arr	= [];
	
	def.forEach(
		function( face ) {
			
			if ( ! obj.pointsPerFace ) {
				
				obj.pointsPerFace	= face.length;
				
			}
			
			face.forEach(
				function( points ) {
					
					if ( ! obj.dimensionality ) {
						
						obj.dimensionality	= points.length;
						
					}
					
					points.forEach(
						function( pt ) {
							
							arr.push( pt );
							
						}
					);
					
				}
			);
			
		}
	);
	
	obj.data	= arr;//new Float32Array( arr );
	
	return	obj;
	
}

Object.defineProperty(
	solids,
	'tetrahedron',
	{
		get	: function() {
			
			return	[
				[
					[ Math.sqrt(8/9), 0, -1/3 ],
					[ -Math.sqrt(2/9), Math.sqrt(2/3), -1/3 ],
					[ -Math.sqrt(2/9), -Math.sqrt(2/3), -1/3 ]
				],
				[
					[ -Math.sqrt(2/9), Math.sqrt(2/3), -1/3 ],
					[ 0, 0, 1 ],
					[ -Math.sqrt(2/9), -Math.sqrt(2/3), -1/3 ]
				],
				[
					[ -Math.sqrt(2/9), -Math.sqrt(2/3), -1/3 ],
					[ 0, 0, 1 ],
					[ Math.sqrt(8/9), 0, -1/3 ]
				],
				[
					[ 0, 0, 1 ],
					[ -Math.sqrt(2/9), Math.sqrt(2/3), -1/3 ],
					[ Math.sqrt(8/9), 0, -1/3 ]
				]
			];
			
		}
	}
);

Object.defineProperty(
	solids,
	'cube',
	{
		get	: function() {
			
			return	[
				[
					[ 0.5, 0.5, 0.5 ],
					[ 0.5, -0.5, 0.5 ],
					[ -0.5, -0.5, 0.5 ],
					[ -0.5, 0.5, 0.5 ]
				],
				[
					[ 0.5, 0.5, -0.5 ],
					[ -0.5, 0.5, -0.5 ],
					[ -0.5, -0.5, -0.5 ],
					[ 0.5, -0.5, -0.5 ]
				],
				[
					[ 0.5, 0.5, 0.5 ],
					[ -0.5, 0.5, 0.5 ],
					[ -0.5, 0.5, -0.5 ],
					[ 0.5, 0.5, -0.5 ]
				],
				[
					[ -0.5, 0.5, 0.5 ],
					[ -0.5, -0.5, 0.5 ],
					[ -0.5, -0.5, -0.5 ],
					[ -0.5, 0.5, -0.5 ]
				],
				[
					[ -0.5, -0.5, 0.5 ],
					[ 0.5, -0.5, 0.5 ],
					[ 0.5, -0.5, -0.5 ],
					[ -0.5, -0.5, -0.5 ]
				],
				[
					[ 0.5, -0.5, 0.5 ],
					[ 0.5, 0.5, 0.5 ],
					[ 0.5, 0.5, -0.5 ],
					[ 0.5, -0.5, -0.5 ]
				]
			];
			
		}
	}
);

Object.defineProperty(
	solids,
	'octahedron',
	{
		get	: function() {
			
			return	[
				[
					[ 1, 0, 0 ],
					[ 0, 0, 1 ],
					[ 0, 1, 0 ]
				],
				[
					[ -1, 0, 0 ],
					[ 0, 1, 0 ],
					[ 0, 0, 1 ]
				],
				[
					[ -1, 0, 0 ],
					[ 0, 0, -1 ],
					[ 0, 1, 0 ]
				],
				[
					[ 1, 0, 0 ],
					[ 0, 1, 0 ],
					[ 0, 0, -1 ]
				],
				[
					[ 1, 0, 0 ],
					[ 0, -1, 0 ],
					[ 0, 0, 1 ]
				],
				[
					[ -1, 0, 0 ],
					[ 0, 0, 1 ],
					[ 0, -1, 0 ]
				],
				[
					[ -1, 0, 0 ],
					[ 0, -1, 0 ],
					[ 0, 0, -1 ]
				],
				[
					[ 1, 0, 0 ],
					[ 0, 0, -1 ],
					[ 0, -1, 0 ]
				]
			];
			
		}
	}
);

Object.defineProperty(
	solids,
	'dodecahedron',
	{
		get	: function() {
			
			//	+-1, +-1, +-1
			//	0, +-PHI, +-1/PHI
			//	+-1/PHI, 0, +-PHI
			//	+-PHI, +-1/PHI, 0
			//
			//	N.B. 20 vertices, 12 faces
			let	points	= [
				[
					[ 0, PHI, 1/PHI ],
					[ 1, 1, 1 ],
					[ 1/PHI, 0, PHI ],
					[ -1/PHI, 0, PHI ],
					[ -1, 1, 1 ]
				],
				[
					[ 0, -PHI, 1/PHI ],
					[ 1, -1, 1 ],
					[ 1/PHI, 0, PHI ],
					[ -1/PHI, 0, PHI ],
					[ -1, -1, 1 ]
				].reverse(),	// TODO this is so lazy FFS simon
				[
					[ 0, PHI, -1/PHI ],
					[ 1, 1, -1 ],
					[ 1/PHI, 0, -PHI ],
					[ -1/PHI, 0, -PHI ],
					[ -1, 1, -1 ]
				].reverse(),
				[
					[ 0, -PHI, -1/PHI ],
					[ 1, -1, -1 ],
					[ 1/PHI, 0, -PHI ],
					[ -1/PHI, 0, -PHI ],
					[ -1, -1, -1 ]
				],
				
				[
					[ 0, PHI, 1/PHI ],
					[ 1, 1, 1 ],
					[ PHI, 1/PHI, 0 ],
					[ 1, 1, -1 ],
					[ 0, PHI, -1/PHI ]
				].reverse(),
				[
					[ 0, -PHI, 1/PHI ],
					[ 1, -1, 1 ],
					[ PHI, -1/PHI, 0 ],
					[ 1, -1, -1 ],
					[ 0, -PHI, -1/PHI ]
				],
				[
					[ 0, PHI, 1/PHI ],
					[ -1, 1, 1 ],
					[ -PHI, 1/PHI, 0 ],
					[ -1, 1, -1 ],
					[ 0, PHI, -1/PHI ]
				],
				[
					[ 0, -PHI, 1/PHI ],
					[ -1, -1, 1 ],
					[ -PHI, -1/PHI, 0 ],
					[ -1, -1, -1 ],
					[ 0, -PHI, -1/PHI ]
				].reverse(),
				
				[
					[ PHI, 1/PHI, 0 ],
					[ 1, 1, 1 ],
					[ 1/PHI, 0, PHI ],
					[ 1, -1, 1 ],
					[ PHI, -1/PHI, 0 ]
				].reverse(),
				[
					[ -PHI, 1/PHI, 0 ],
					[ -1, 1, 1 ],
					[ -1/PHI, 0, PHI ],
					[ -1, -1, 1 ],
					[ -PHI, -1/PHI, 0 ]
				],
				[
					[ PHI, 1/PHI, 0 ],
					[ 1, 1, -1 ],
					[ 1/PHI, 0, -PHI ],
					[ 1, -1, -1 ],
					[ PHI, -1/PHI, 0 ]
				],
				[
					[ -PHI, 1/PHI, 0 ],
					[ -1, 1, -1 ],
					[ -1/PHI, 0, -PHI ],
					[ -1, -1, -1 ],
					[ -PHI, -1/PHI, 0 ]
				].reverse()
			];
			
			//	N.B. must divide all by PHI to fit in unit sphere
			return	points.map(	
				function( face ) {
					
					return	face.map(
						function( pt ) {
							
							return	pt.map(function( v ) { return	v/PHI; });
							
						}
					);
					
				}
			);
			
		}
	}
);

Object.defineProperty(
	solids,
	'icosahedron',
	{
		get	: function() {
			
			let	points	= [],
				north	= [ 0, 1, 0 ],
				south	= [ 0, -1, 0 ],
				
				atanHalf	= Math.atan( 0.5 );

			for ( let i = 0, n = 10; i < n; i++ ) {
				
				let	yaw		= 2 * Math.PI * i / n,
					pitch	= i % 2
								? -atanHalf
								: atanHalf;
				
				points.push(
					[
						Math.cos( pitch ) * -1 * Math.sin( yaw ),
						Math.sin( pitch ),
						Math.cos( pitch ) * Math.cos( yaw )
					]
				);
				
			}


			let	shape	= [];

			points.forEach(
				function( pt, idx ) {
					
					let	pole	= pt[ 1 ] < 0
									? south
									: north,
						other1	= ( points[ ( ( idx + 2 ) % 10 /* points.length is 10 */ ) ] ),
						other2	= ( points[ ( ( idx + 1 ) % 10 /* points.length is 10 */ ) ] );
					
					if ( pt[ 1 ] < 0 ) {
						
						shape.push(
							[ pole, other1, pt ],
							[ other1, other2, pt ]
						);
						
					} else {
						
						shape.push(
							[ pole, pt, other1 ],
							[ other1, pt, other2 ]
						);
						
					}
					
				}
			);

			return	shape;

		}
	}
);


Object.defineProperty(
	solids,
	'globe',
	{
		get	: function() {
			
			let	polarAngles	= (function() {
					
					let	angles	= [];
					
					for ( let i = 0, n = 12; i < n; i++ ) {
						
						angles.push(
							2 * Math.PI * i / n
						);
						
					}
					
					return	angles;
					
				})(),
				lattitudes	= (function() {
					
					let	angles	= [];
					
					for ( let i = 0, n = 7; i <= n; i++ ) {
						
						angles.push(
							Math.PI / 2 - ( Math.PI * i / n )
						);
						
					}
					
					return	angles;
					
				})();
			
			
			let	shape	= [];
			
			polarAngles.forEach(
				function( angle1, idx1 ) {
					
					let	nextAngle1	= polarAngles[ idx1 + 1 ] || polarAngles[ 0 ];
					
					lattitudes.forEach(
						function( angle2, idx2 ) {
							
							if ( idx2 ) {	// can skip first
								
								let	prevAngle2	= lattitudes[ idx2 - 1 ];
								
								
								let	xa	= -Math.sin( angle1 ),
									za	= Math.cos( angle1 ),
									
									xb	= -Math.sin( nextAngle1 ),
									zb	= Math.cos( nextAngle1 ),
									
									cos1	= Math.cos( angle2 ),
									sin1	= Math.sin( angle2 ),
									
									x1	= ( cos1 * xa ),
									z1	= ( cos1 * za ),
									y1	= sin1,
									
									x4	= ( cos1 * xb ),
									z4	= ( cos1 * zb ),
									y4	= sin1,
									
									cos2	= Math.cos( prevAngle2 ),
									sin2	= Math.sin( prevAngle2 ),
									
									x2	= ( cos2 * xa ),
									z2	= ( cos2 * za ),
									y2	= sin2,
									
									x3	= ( cos2 * xb ),
									z3	= ( cos2 * zb ),
									y3	= sin2;
								
								shape.push(
									[
										[ x1, y1, z1 ],
										[ x4, y4, z4 ],
										[ x3, y3, z3 ],
										[ x2, y2, z2 ]
									]
								);
								
							}
							
						}
					);
					
				}
			);
			
			return	shape;
			
		}
	}
);
