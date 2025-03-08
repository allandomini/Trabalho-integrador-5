// Three.js Pixelated First-Person Game
// Fixed controls: W moves forward, S moves backward
// More realistic jumping physics
// Pixel art style

// Save the following as game.js

// Global variables
let camera, scene, renderer;
let pixelRenderTarget, pixelPass;
let player = { height: 2, speed: 0.2, jumpStrength: 6, inAir: false, jumpCooldown: 0 };
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false, canJump = false;
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let prevTime = performance.now();
let raycaster = new THREE.Raycaster();
let platforms = [];
let collectibles = [];
let collectedItems = 0;
let totalItems = 5;
let terrainSize = 100;
let terrain;
let noise;
let effectComposer;
let castle;
let castleDoorTrigger;

// Initialize the game
function init() {
  // Set up noise generator for procedural generation
  noise = new SimplexNoise();
  
  // Create scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // Sky blue
  scene.fog = new THREE.Fog(0x87ceeb, 0, 60);
  
  // Create camera
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.y = player.height;
  
  // Create lighting - use simpler lighting for pixel art style
  const ambientLight = new THREE.AmbientLight(0x777777);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 0.5).normalize();
  scene.add(directionalLight);
  
  // Create renderer
  renderer = new THREE.WebGLRenderer({ antialias: false }); // Turn off antialiasing for pixel style
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Set up pixel rendering
  setupPixelRenderer();
  
  // Generate terrain
  generateTerrain();
  
  // Generate platforms
  generatePlatforms();
  
  // Generate collectibles
  generateCollectibles();
  
  // Generate castle
  generateCastle();
  
  // Set up controls
  setupControls();
  
  // Handle window resize
  window.addEventListener('resize', onWindowResize, false);
  
  // Start animation loop
  animate();
}

// Set up pixel rendering using a custom shader
function setupPixelRenderer() {
  // Define the pixel resolution
  const pixelSize = 6; // Higher number = more pixelated
  
  // Create custom pixel shader
  const pixelShader = {
    uniforms: {
      "tDiffuse": { value: null },
      "resolution": { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      "pixelSize": { value: pixelSize }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      uniform vec2 resolution;
      uniform float pixelSize;
      varying vec2 vUv;
      
      void main() {
        vec2 dxy = pixelSize / resolution;
        vec2 coord = dxy * floor(vUv / dxy);
        gl_FragColor = texture2D(tDiffuse, coord);
      }
    `
  };
  
  // Set up post-processing
  const pixelShaderPass = new THREE.ShaderPass(pixelShader);
  
  // Create simple pass-through effect composer
  effectComposer = new THREE.EffectComposer(renderer);
  effectComposer.addPass(new THREE.RenderPass(scene, camera));
  effectComposer.addPass(pixelShaderPass);
  
  // Add final pass to output to screen
  const outputPass = new THREE.ShaderPass(THREE.CopyShader);
  outputPass.renderToScreen = true;
  effectComposer.addPass(outputPass);
}

// Generate procedural terrain with a more blocky, pixel art style
function generateTerrain() {
  const geometry = new THREE.PlaneGeometry(terrainSize, terrainSize, 64, 64);
  geometry.rotateX(-Math.PI / 2);
  
  // Apply noise to vertex heights
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const z = positions.getZ(i);
    
    // Generate terrain height using noise
    const frequency = 0.03;
    const amplitude = 5;
    
    // For pixelated terrain, we'll quantize the heights
    let noiseValue = noise.noise2D(x * frequency, z * frequency);
    // Quantize noise to create more blocky terrain
    noiseValue = Math.round(noiseValue * 3) / 3; 
    
    positions.setY(i, noiseValue * amplitude);
  }
  
  // Update geometry
  geometry.computeVertexNormals();
  
  // Create material and mesh - use flat shading for pixel art style
  const material = new THREE.MeshLambertMaterial({
    color: 0x33aa33,
    flatShading: true,
    vertexColors: false,
  });
  
  terrain = new THREE.Mesh(geometry, material);
  terrain.receiveShadow = true;
  scene.add(terrain);
}

// Generate platforms to jump on
function generatePlatforms() {
  const platformGeometry = new THREE.BoxGeometry(3, 0.5, 3);
  
  // For pixel art style, use basic materials with limited color palette
  const platformMaterials = [
    new THREE.MeshLambertMaterial({ color: 0x996633 }), // Brown
    new THREE.MeshLambertMaterial({ color: 0x8B4513 }), // SaddleBrown
    new THREE.MeshLambertMaterial({ color: 0xA52A2A })  // Brown-Red
  ];
  
  // Create several platforms with varying heights and positions
  for (let i = 0; i < 15; i++) {
    // Generate platform positions
    const x = (Math.random() - 0.5) * terrainSize * 0.8;
    const z = (Math.random() - 0.5) * terrainSize * 0.8;
    
    // Determine height based on terrain + some offset
    const xRatio = (x + terrainSize / 2) / terrainSize;
    const zRatio = (z + terrainSize / 2) / terrainSize;
    const freq = 0.03;
    const terrainHeight = Math.round(noise.noise2D(x * freq, z * freq) * 5 * 2) / 2; // Quantize for pixel feel
    
    // Platform height increases with distance from center
    const distanceFromCenter = Math.sqrt(x * x + z * z);
    const platformHeight = terrainHeight + 1 + Math.floor(distanceFromCenter * 0.1) * 0.5; // Quantize heights
    
    // Choose a random material from our limited palette
    const platformMaterial = platformMaterials[Math.floor(Math.random() * platformMaterials.length)];
    
    // Create platform
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(
      Math.round(x * 2) / 2, // Quantize positions for more pixel-like alignment
      platformHeight,
      Math.round(z * 2) / 2
    );
    platform.castShadow = true;
    platform.receiveShadow = true;
    
    // Add to scene and platforms array for collision detection
    scene.add(platform);
    platforms.push({
      mesh: platform,
      bounds: new THREE.Box3().setFromObject(platform)
    });
  }
}

// Generate collectible items (puzzle elements)
function generateCollectibles() {
  // For pixel art style, use simple geometries
  const collectibleGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
  
  // Limited color palette for pixel art style
  const collectibleMaterial = new THREE.MeshLambertMaterial({ 
    color: 0xffcc00,
    emissive: 0xff8800,
    emissiveIntensity: 0.3,
    flatShading: true
  });
  
  // Place collectibles on some platforms
  for (let i = 0; i < totalItems; i++) {
    const platformIndex = Math.floor(Math.random() * platforms.length);
    const platform = platforms[platformIndex].mesh;
    
    const collectible = new THREE.Mesh(collectibleGeometry, collectibleMaterial);
    
    // Position above platform
    collectible.position.copy(platform.position);
    collectible.position.y += 1.5;
    
    // Animation properties
    collectible.rotationSpeed = 0.01 + Math.random() * 0.02;
    collectible.floatSpeed = 0.005 + Math.random() * 0.01;
    collectible.floatHeight = 0.3 + Math.random() * 0.3;
    collectible.initialY = collectible.position.y;
    collectible.floatTime = Math.random() * Math.PI * 2;
    
    // Add to scene and collectibles array
    scene.add(collectible);
    collectibles.push({
      mesh: collectible,
      collected: false,
      bounds: new THREE.Sphere(collectible.position, 0.5)
    });
  }
}

// Generate castle
function generateCastle() {
  const stoneMaterial = new THREE.MeshLambertMaterial({ color: 0x999999, flatShading: true });
  const accentMaterial = new THREE.MeshLambertMaterial({ color: 0x333333, flatShading: true });
  const woodMaterial = new THREE.MeshLambertMaterial({ color: 0x663300, flatShading: true });
  const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x996633, flatShading: true });
  
  const outerWidth = 40;
  const outerDepth = 40;
  const wallThickness = 4;
  const wallHeight = 20;
  const merlonWidth = 2;
  const merlonHeight = 4;
  const merlonDepth = 2;
  const merlonSpacing = 2;
  const sideMerlonCount = Math.floor((outerWidth - wallThickness) / (merlonWidth + merlonSpacing));
  
  castle = new THREE.Group();
  
  // Walls
  const wallGeometry = new THREE.BoxGeometry(outerWidth, wallHeight, wallThickness);
  const wallMesh = new THREE.Mesh(wallGeometry, stoneMaterial);
  wallMesh.position.set(0, wallHeight/2, -outerDepth/2 + wallThickness/2);
  castle.add(wallMesh);
  
  const wallGeometry2 = new THREE.BoxGeometry(outerWidth, wallHeight, wallThickness);
  const wallMesh2 = new THREE.Mesh(wallGeometry2, stoneMaterial);
  wallMesh2.position.set(0, wallHeight/2, outerDepth/2 - wallThickness/2);
  castle.add(wallMesh2);
  
  const wallGeometry3 = new THREE.BoxGeometry(wallThickness, wallHeight, outerDepth);
  const wallMesh3 = new THREE.Mesh(wallGeometry3, stoneMaterial);
  wallMesh3.position.set(-outerWidth/2 + wallThickness/2, wallHeight/2, 0);
  castle.add(wallMesh3);
  
  const wallGeometry4 = new THREE.BoxGeometry(wallThickness, wallHeight, outerDepth);
  const wallMesh4 = new THREE.Mesh(wallGeometry4, stoneMaterial);
  wallMesh4.position.set(outerWidth/2 - wallThickness/2, wallHeight/2, 0);
  castle.add(wallMesh4);
  
  // Battlements
  // Top battlements
  for (let i = 0; i < sideMerlonCount; i++) {
    const x = -outerWidth/2 + merlonWidth/2 + i * (merlonWidth + merlonSpacing);
    
    const merlon = new THREE.Mesh(
      new THREE.BoxGeometry(merlonWidth, merlonHeight, merlonDepth),
      stoneMaterial
    );
    merlon.position.set(x, wallHeight + merlonHeight/2, -outerDepth/2 + wallThickness/2);
    castle.add(merlon);
  }
  
  for (let i = 0; i < sideMerlonCount; i++) {
    const x = -outerWidth/2 + merlonWidth/2 + i * (merlonWidth + merlonSpacing);
    
    const merlon = new THREE.Mesh(
      new THREE.BoxGeometry(merlonWidth, merlonHeight, merlonDepth),
      stoneMaterial
    );
    merlon.position.set(x, wallHeight + merlonHeight/2, outerDepth/2 - wallThickness/2);
    castle.add(merlon);
  }
  
  // Right wall battlements
  for (let i = 0; i < sideMerlonCount; i++) {
    const z = -outerDepth/2 + merlonWidth/2 + i * (merlonWidth + merlonSpacing);
    
    const merlon = new THREE.Mesh(
      new THREE.BoxGeometry(merlonWidth, merlonHeight, merlonDepth),
      stoneMaterial
    );
    merlon.position.set(outerWidth/2, wallHeight + merlonHeight/2, z);
    castle.add(merlon);
  }
  
  // Left wall battlements
  for (let i = 0; i < sideMerlonCount; i++) {
    const z = -outerDepth/2 + merlonWidth/2 + i * (merlonWidth + merlonSpacing);
    
    const merlon = new THREE.Mesh(
      new THREE.BoxGeometry(merlonWidth, merlonHeight, merlonDepth),
      stoneMaterial
    );
    merlon.position.set(-outerWidth/2, wallHeight + merlonHeight/2, z);
    castle.add(merlon);
  }
  
  // Main gate/entrance
  const gateWidth = 12;
  const gateHeight = 15;
  const gateMaterial = new THREE.MeshLambertMaterial({
    color: 0x663300,
    flatShading: true
  });
  
  const gateGeometry = new THREE.BoxGeometry(gateWidth, gateHeight, wallThickness * 1.2);
  const gate = new THREE.Mesh(gateGeometry, woodMaterial);
  gate.position.set(0, gateHeight/2, -outerDepth/2 + wallThickness/2);
  castle.add(gate);
  
  // Gate frame/archway
  const archGeometry = new THREE.BoxGeometry(gateWidth + 4, gateHeight + 4, wallThickness/2);
  const archFrame = new THREE.Mesh(archGeometry, accentMaterial);
  archFrame.position.set(0, gateHeight/2, -outerDepth/2 + wallThickness/2 - 1);
  castle.add(archFrame);
  
  // Towers at corners
  const towerHeight = wallHeight + 10;
  const towerWidth = 10;
  
  const towers = [
    { x: -outerWidth/2, z: -outerDepth/2 },
    { x: outerWidth/2, z: -outerDepth/2 },
    { x: -outerWidth/2, z: outerDepth/2 },
    { x: outerWidth/2, z: outerDepth/2 }
  ];
  
  towers.forEach(tower => {
    const towerGeometry = new THREE.BoxGeometry(towerWidth, towerHeight, towerWidth);
    const towerMesh = new THREE.Mesh(towerGeometry, stoneMaterial);
    
    towerMesh.position.set(tower.x, towerHeight/2, tower.z);
    
    // Add small battlements to towers
    const towerMerlonCount = Math.floor(towerWidth / (merlonWidth + merlonSpacing));
    
    // Top battlements for each tower face
    ['x', 'z'].forEach(axis => {
      for (let i = 0; i < towerMerlonCount; i++) {
        const merlonOffset = -towerWidth/2 + merlonWidth/2 + i * (merlonWidth + merlonSpacing);
        
        const towerMerlon = new THREE.Mesh(
          new THREE.BoxGeometry(merlonWidth, merlonHeight, merlonWidth),
          stoneMaterial
        );
        
        if (axis === 'x') {
          towerMerlon.position.set(
            tower.x + merlonOffset, 
            towerHeight + merlonHeight/2, 
            tower.z + towerWidth/2
          );
        } else {
          towerMerlon.position.set(
            tower.x + towerWidth/2, 
            towerHeight + merlonHeight/2, 
            tower.z + merlonOffset
          );
        }
        
        castle.add(towerMerlon);
      }
    });
    
    castle.add(towerMesh);
  });
  
  // Roof for the main keep (simplified)
  const roofGeometry = new THREE.ConeGeometry(Math.sqrt(Math.pow(outerWidth/2, 2) + Math.pow(outerDepth/2, 2)), 15, 4);
  const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial);
  roofMesh.position.set(0, wallHeight + 15/2, 0);
  roofMesh.rotation.y = Math.PI / 4; // Rotate to align with walls
  castle.add(roofMesh);
  
  // Position castle in the scene
  castle.position.set(0, 5, 150); // Higher and further back
  
  // Create a trigger area for the castle door
  const doorTriggerGeometry = new THREE.BoxGeometry(gateWidth, gateHeight, 5);
  const doorTriggerMaterial = new THREE.MeshBasicMaterial({ 
    color: 0x00ff00, 
    transparent: true, 
    opacity: 0.3 
  });
  
  castleDoorTrigger = new THREE.Mesh(doorTriggerGeometry, doorTriggerMaterial);
  castleDoorTrigger.position.set(0, gateHeight/2, 150 - outerDepth/2 + 5);
  
  scene.add(castle);
  scene.add(castleDoorTrigger);
}

// Set up first-person controls
function setupControls() {
  // Lock pointer and handle movement
  // FIXED: W now correctly moves forward, S moves backward
  const onKeyDown = function(event) {
    switch (event.code) {
      case 'KeyW': moveForward = true; break;
      case 'KeyA': moveLeft = true; break;
      case 'KeyS': moveBackward = true; break;
      case 'KeyD': moveRight = true; break;
      case 'Space': 
        if (canJump && !player.inAir && player.jumpCooldown <= 0) {
          velocity.y = player.jumpStrength;
          canJump = false;
          player.inAir = true;
          player.jumpCooldown = 0.3; // Add a small cooldown between jumps
        }
        break;
    }
  };
  
  const onKeyUp = function(event) {
    switch (event.code) {
      case 'KeyW': moveForward = false; break;
      case 'KeyA': moveLeft = false; break;
      case 'KeyS': moveBackward = false; break;
      case 'KeyD': moveRight = false; break;
    }
  };
  
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('keyup', onKeyUp, false);
  
  // Mouse look controls
  let isMouseLocked = false;
  
  const onMouseMove = function(event) {
    if (!isMouseLocked) return;
    
    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;
    
    // Rotate camera horizontally
    camera.rotation.y -= movementX * 0.002;
    
    // Limit vertical rotation
    const verticalRotation = camera.rotation.x - movementY * 0.002;
    camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, verticalRotation));
  };
  
  // Lock pointer on click
  const onClick = function() {
    if (!isMouseLocked) {
      renderer.domElement.requestPointerLock();
    }
  };
  
  // Handle pointer lock change
  const onPointerLockChange = function() {
    isMouseLocked = document.pointerLockElement === renderer.domElement;
  };
  
  document.addEventListener('mousemove', onMouseMove, false);
  renderer.domElement.addEventListener('click', onClick, false);
  document.addEventListener('pointerlockchange', onPointerLockChange, false);
}

// Handle window resize
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  if (effectComposer) {
    effectComposer.setSize(window.innerWidth, window.innerHeight);
    // Update pixel shader uniforms
    effectComposer.passes.forEach(pass => {
      if (pass.uniforms && pass.uniforms.resolution) {
        pass.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
      }
    });
  }
}

// Check collisions with platforms
function checkPlatformCollisions() {
  // Player bounding box
  const playerBox = new THREE.Box3();
  const playerSize = new THREE.Vector3(1, player.height, 1);
  const playerPos = new THREE.Vector3(
    camera.position.x,
    camera.position.y - player.height / 2,
    camera.position.z
  );
  playerBox.setFromCenterAndSize(playerPos, playerSize);
  
  // Check terrain height at player position
  const terrainHeight = getTerrainHeightAtPosition(camera.position.x, camera.position.z);
  
  // Fall until hitting terrain
  if (camera.position.y < terrainHeight + player.height) {
    camera.position.y = terrainHeight + player.height;
    velocity.y = 0;
    canJump = true;
    player.inAir = false;
  }
  
  // Check platform collisions
  let onPlatform = false;
  
  for (const platform of platforms) {
    if (playerBox.intersectsBox(platform.bounds)) {
      // Check if landing on top of platform
      if (velocity.y < 0 && 
          camera.position.y - player.height <= platform.mesh.position.y + 0.25 && 
          camera.position.y > platform.mesh.position.y) {
        camera.position.y = platform.mesh.position.y + 0.25 + player.height;
        velocity.y = 0;
        canJump = true;
        player.inAir = false;
        onPlatform = true;
      }
      
      // Check for horizontal collision (simple)
      const platformCenter = platform.mesh.position.clone();
      const playerCenter = new THREE.Vector3(camera.position.x, platformCenter.y, camera.position.z);
      const distance = platformCenter.distanceTo(playerCenter);
      
      if (distance < 2 && Math.abs(camera.position.y - platformCenter.y) < 2) {
        const pushDirection = playerCenter.sub(platformCenter).normalize();
        camera.position.x += pushDirection.x * 0.1;
        camera.position.z += pushDirection.z * 0.1;
      }
    }
  }
  
  // Apply gravity if not on ground or platform
  if (!onPlatform && camera.position.y > terrainHeight + player.height) {
    canJump = false;
  }
}

// Get terrain height at a given x,z position
function getTerrainHeightAtPosition(x, z) {
  const frequency = 0.03;
  // Quantize terrain height for more pixel-like feel
  return Math.round(noise.noise2D(x * frequency, z * frequency) * 5 * 2) / 2;
}

// Check collisions with collectibles
function checkCollectibleCollisions() {
  // Simple distance-based collision for collectibles
  const playerPosition = camera.position.clone();
  
  collectibles.forEach(collectible => {
    if (!collectible.collected && 
        playerPosition.distanceTo(collectible.mesh.position) < 1.5) {
      collectible.collected = true;
      collectible.mesh.visible = false;
      collectedItems++;
      
      // Update UI
      document.getElementById('progress').textContent = `Items collected: ${collectedItems}/${totalItems}`;
      
      // Check if all items collected
      if (collectedItems === totalItems) {
        document.getElementById('info').textContent = "Congratulations! You found all items. Puzzle completed!";
      }
    }
  });
}

// Animate collectibles
function animateCollectibles(time) {
  collectibles.forEach(collectible => {
    if (!collectible.collected) {
      // Rotate - use quarter rotations for pixel style
      collectible.mesh.rotation.y = Math.floor(time * 0.001 * collectible.mesh.rotationSpeed * 4) * (Math.PI / 2);
      
      // Float up and down with quantized positions for pixel feel
      collectible.mesh.floatTime += collectible.mesh.floatSpeed;
      const floatOffset = Math.sin(collectible.mesh.floatTime) * collectible.mesh.floatHeight;
      const quantizedOffset = Math.round(floatOffset * 4) / 4; // Quantize to create pixel-like movement
      collectible.mesh.position.y = collectible.mesh.initialY + quantizedOffset;
    }
  });
}

// Main animation loop
function animate() {
  requestAnimationFrame(animate);
  
  const time = performance.now();
  const delta = (time - prevTime) / 1000;
  
  // Update jump cooldown
  if (player.jumpCooldown > 0) {
    player.jumpCooldown -= delta;
  }
  
  // Update velocity with gravity - more realistic physics
  const gravity = 20; // Stronger gravity for more realistic jumps
  velocity.y -= gravity * delta; // Apply gravity
  
  // Apply terminal velocity for more realistic falling
  velocity.y = Math.max(velocity.y, -20);
  
  // Update player position based on velocity
  camera.position.y += velocity.y * delta;
  
  // Check collisions
  checkPlatformCollisions();
  checkCollectibleCollisions();
  
  // Move player based on controls with more realistic movement
  direction.z = Number(moveForward) - Number(moveBackward);
  direction.x = Number(moveRight) - Number(moveLeft);
  direction.normalize();
  
  // Move forward/backward and strafe left/right
  if (moveForward || moveBackward) {
    camera.position.z += direction.z * player.speed * Math.cos(camera.rotation.y);
    camera.position.x += direction.z * player.speed * Math.sin(camera.rotation.y);
  }
  
  if (moveLeft || moveRight) {
    camera.position.z += direction.x * player.speed * Math.cos(camera.rotation.y + Math.PI/2);
    camera.position.x += direction.x * player.speed * Math.sin(camera.rotation.y + Math.PI/2);
  }
  
  // Ensure player stays within terrain bounds
  const halfTerrainSize = terrainSize / 2;
  camera.position.x = Math.max(-halfTerrainSize, Math.min(halfTerrainSize, camera.position.x));
  camera.position.z = Math.max(-halfTerrainSize, Math.min(halfTerrainSize, camera.position.z));
  
  // Animate collectibles
  animateCollectibles(time);
  
  // Render the scene using the pixel effect composer
  if (effectComposer) {
    effectComposer.render();
  } else {
    // Fallback to normal rendering if effect composer not available
    renderer.render(scene, camera);
  }
  
  prevTime = time;
}

// Initialize the game when the window loads
window.onload = init;