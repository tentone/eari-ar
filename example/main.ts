import {BoxGeometry, Mesh, MeshBasicMaterial, MeshPhysicalMaterial, SphereGeometry, Vector3} from "three";
import {ARRenderer, Cursor, LightProbe, Measurement, Planes} from "../src/Main";

const renderer = new ARRenderer();

let box: Mesh = new Mesh(new BoxGeometry(), new MeshBasicMaterial());
box.scale.setScalar(0.1);
renderer.scene.add(box);

box = new Mesh(new BoxGeometry(), new MeshPhysicalMaterial());
box.scale.setScalar(0.1);
box.position.set(0, 0, -1);
renderer.scene.add(box);

const probe = new LightProbe();
renderer.scene.add(probe);

const planes = new Planes();
renderer.scene.add(planes);

const ruler = new Measurement([new Vector3(0, 0, 0), new Vector3(1, 0, -2)]);
renderer.scene.add(ruler);

const cursor = new Cursor();
renderer.scene.add(cursor);

renderer.domContainer.onclick = function() {
    if (cursor.visible) {
        let sphere = new Mesh(new SphereGeometry(), new MeshPhysicalMaterial());
        sphere.scale.setScalar(0.1);
        sphere.position.copy(cursor.position);
        sphere.position.y += sphere.scale.y / 2.0;
        renderer.scene.add(sphere);
    }
};

renderer.onFrame = function() {
    box.rotation.y += 0.01;
};

var button = document.getElementById("start");
button.onclick = () =>
{
    renderer.start();
};
