import {DataTexture, LuminanceAlphaFormat, UnsignedByteType, LinearFilter, ClampToEdgeWrapping, Texture, NearestFilter} from "three";

/**
 * Stores the raw depth values in a 16 bit value packed texture.
 *
 * The distance to the camera is stored in millimeters.
 *
 * This depth has to be unpacked in shader and multiplied by the normalization matrix to obtain rectified UV coordinates.
 */
export class DepthDataTexture extends DataTexture
{
	public constructor(depthData: XRCPUDepthInformation)
	{
		super(new Uint8Array(depthData.data), depthData.width, depthData.height, LuminanceAlphaFormat);

		this.magFilter = LinearFilter;
		// this.minFilter = LinearFilter;
		// this.wrapS = ClampToEdgeWrapping;
		// this.wrapT = ClampToEdgeWrapping;
		// this.unpackAlignment = 1;
	}

	/**
	 * Update the texture with new depth data.
	 *
	 * Depth data is retrieved from the WebXR API.
	 *
	 * @param depthData
	 */
	public updateDepth(depthData: XRCPUDepthInformation): void
	{	
		this.image.data.set(new Uint8Array(depthData.data));
		this.needsUpdate = true;
	}
}
