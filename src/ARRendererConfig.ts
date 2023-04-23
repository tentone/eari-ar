
/**
 * Configuration of the AR renderer.
 * 
 * Indicates the capabilities required by the renderer.
 */
export class ARRendererConfig 
{
	/**
	 * If true webgl 2 is used instead of webgl 1.
	 */
	public useWebGL2? = false;

	/**
	 * The front-facing camera API enables AR experiences to express their preference to use a front-facing (or "selfie") camera when creating immersive sessions.
	 * 
	 * Some XR device form factors, most notably smartphones, have multiple cameras that can be used to power an immersive (generally AR) experience.
	 * 
	 * Might not work alongside other features (e.g. depth-sensing, light-probe)
	 * 
	 * More information about the feature https://github.com/immersive-web/front-facing-camera/blob/main/explainer.md
	 */
	public frontFacing? = false;

	/**
	 * DOM overlay will create a DOM container to place custom HTML elements in the screen.
	 * 
	 * Usefull to place button and other GUI elements on top of the AR scene.
	 * 
	 * Can be used alongside CSS 3D to have HTML element following the environment.
	 */
	public domOverlay? = false;

	/**
	 * Hit test allow the user to ray cast into real-wolrd depth data.
	 * 
	 * Useful for interaction, object placement, etc. 
	 */
	public hitTest? = false;

	/**
	 * Lighting probe allow the system to check environment ligthing.
	 * 
	 * Tracks the intensity direction and color of the main light source.
	 */
	public lightProbe? = false;

	/**
	 * Reflection cube map allow the obtain visual information of the user surrondings.
	 */
	public reflectionCubeMap? = false;

	/**
	 * Depth information captured from the environment.
	 */
	public depthSensing? = false;

	/**
	 * Provide a texture with the depth data captured by the system.
	 * 
	 * Automatically updated by the renderer every frame.
	 */
	public depthTexture? = false;

	/**
	 * Provide a canvas texture with depth information.
	 * 
	 * Canvas texture is acessible on CPU, it is slower to update.
	 * 
	 * Automatically updated by the renderer every frame.
	 */
	public depthCanvasTexture? = false;
}