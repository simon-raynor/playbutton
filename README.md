# Playbutton

An animated "play" icon which responds to clicks/taps by spinning

## TODO

### for version 1

* Rewrite renderer to use SVG (for easier styling)
	* Check that perf is not affected too badly
	* Make the render mode optional?
* Work out MVP for events emitted by the component
	* Initial click
	* Finished spinning
* Package current codebase into a useful format
	* Initialisation function which returns the instance
		* Option to initialise w/ an existing button?
		* Option to create a button on init?
		* Option to read canvas size from target size (default)?
		* Option to pass in canvas size?

### for version 2+

* Different shapes
	* Potentially any/all svgs?
* Different timings
* Different behaviours
	* Mousemove tilt
	* Mousedown tilt
	* Mousedown "charge up"
	* Fixed/random rotation axis
	* Option for no built in events?
* Instance method to trigger a spin w/o event
