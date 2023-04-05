import {AmbientLightProbe, DirectionalLight, Group, Vector3} from "three";
import {ARRenderer} from "ARRenderer";
import {ARObject} from "./ARObject";

/**
 * Light probe can be used to cast light the mirror the lighting conditions in real world.
 */
export class LightProbe extends Group implements ARObject
{
	/**
	 * Directional shadow casting light.
	 */
	public directional: DirectionalLight = null;

	/**
	 * Light probe object using spherical harmonics.
	 */
	public probe: AmbientLightProbe = null;

	public isARObject = true;

	public constructor() 
	{
		super();

		this.directional = new DirectionalLight();
		this.directional.castShadow = true;
		this.directional.shadow.mapSize.set(1024, 1024);
		this.directional.shadow.camera.far = 20;
		this.directional.shadow.camera.near = 0.1;
		this.directional.shadow.camera.left = -5;
		this.directional.shadow.camera.right = 5;
		this.directional.shadow.camera.bottom = -5;
		this.directional.shadow.camera.top = 5;
		this.add(this.directional);

		this.probe = new AmbientLightProbe();
		this.add(this.probe);
	}

	public beforeARUpdate(renderer: ARRenderer, time: number, frame: XRFrame): void 
	{
		// Process lighting condition from probe
		if (renderer.xrLightProbe)
		{
			// @ts-ignore
			let lightEstimate = frame.getLightEstimate(renderer.xrLightProbe);

			// console.log('enva-xr: Light estimated', lightEstimate);
			
			if (lightEstimate)
			{
				let primaryLightPos = new Vector3(lightEstimate.primaryLightDirection.x, lightEstimate.primaryLightDirection.y, lightEstimate.primaryLightDirection.z);
				primaryLightPos.multiplyScalar(5);

				let intensity = Math.max(1.0, Math.max(lightEstimate.primaryLightIntensity.x, Math.max(lightEstimate.primaryLightIntensity.y, lightEstimate.primaryLightIntensity.z)));
				this.directional.position.copy(primaryLightPos);
				this.directional.color.setRGB(lightEstimate.primaryLightIntensity.x / intensity, lightEstimate.primaryLightIntensity.y / intensity, lightEstimate.primaryLightIntensity.z / intensity);
				this.directional.intensity = intensity;

				this.probe.sh.fromArray(lightEstimate.sphericalHarmonicsCoefficients);
			}
		}

	}	
}
