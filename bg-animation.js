// 3D Background Animation using Three.js
// Mimicking the floating elements/space vibe of Fantik

const initThreeJS = () => {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.002); // Deep black fog

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Clamp for performance

    // Create a container specifically for the canvas to sit behind everything
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.zIndex = '-2'; // Behind the "shapes" div but visible
    container.id = 'canvas-container';
    document.body.prepend(container);
    container.appendChild(renderer.domElement);

    // Particles/Stars - OPTIMIZED
    const geometry = new THREE.BufferGeometry();
    const count = 1800; // Reduced for performance
    const posArray = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 35; // Wider spread
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material for stars
    const material = new THREE.PointsMaterial({
        size: 0.04, // Larger particles
        color: 0xff4d4d, // Accent Red
        transparent: true,
        opacity: 0.8,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Add "Floating Rocks" (Icosahedrons) - OPTIMIZED
    const rocks = [];
    const rockGeo = new THREE.IcosahedronGeometry(1, 0); // Larger base size
    const rockMat = new THREE.MeshBasicMaterial({
        color: 0x333333,
        wireframe: true
    });

    for (let i = 0; i < 12; i++) { // Reduced count
        const rock = new THREE.Mesh(rockGeo, rockMat);
        const spread = 25;
        rock.position.set(
            (Math.random() - 0.5) * spread,
            (Math.random() - 0.5) * spread,
            (Math.random() - 0.5) * 10
        );

        // Random scale for variety
        const scale = Math.random() * 0.8 + 0.5;
        rock.scale.set(scale, scale, scale);

        scene.add(rock);
        rocks.push({
            mesh: rock,
            rotSpeed: { x: (Math.random() - 0.5) * 0.01, y: (Math.random() - 0.5) * 0.01 },
            floatSpeed: Math.random() * 0.005,
            initialY: rock.position.y
        });
    }

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    });

    // Animation Loop
    const animate = () => {
        requestAnimationFrame(animate);

        targetX = mouseX * 0.002; // More sensitive
        targetY = mouseY * 0.002;

        // Smooth rotation of the particle field based on mouse
        particles.rotation.y += 0.001; // Constant spin
        particles.rotation.x += (targetY - particles.rotation.x) * 0.05;
        particles.rotation.y += (targetX - particles.rotation.y) * 0.05;

        // Animate Rocks
        const time = Date.now() * 0.001;
        rocks.forEach((rock, i) => {
            rock.mesh.rotation.x += rock.rotSpeed.x;
            rock.mesh.rotation.y += rock.rotSpeed.y;
            // Float up and down
            rock.mesh.position.y = rock.initialY + Math.sin(time + i) * 1;
        });

        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// Initialize after DOM load
document.addEventListener('DOMContentLoaded', initThreeJS);
