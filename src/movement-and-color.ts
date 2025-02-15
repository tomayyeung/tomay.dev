/** Display an error in the error box */
function showError(errorText: string) {
    console.log(errorText);
    const errorBoxDiv = document.getElementById("error-box");
    if (errorBoxDiv === null) {
        return;
    }
    const errorTextElement = document.createElement("p");
    errorTextElement.innerText = errorText;
    errorBoxDiv.appendChild(errorTextElement);
}

function moventAndColor() {
    const canvas = document.getElementById("demo-canvas");
    if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
        showError("Cannot get canvas element");
        return;
    }
    const gl = canvas.getContext("webgl2");
    if (!gl) {
        showError("This browser does not support WebGL 2");
        return;
    }

    const triangleVertices = [
        // top middle
        0.0, 0.5,
        // bottom left
        -0.5, -0.5,
        // bottom right
        0.5, -0.5
    ];
    const triangleVerticesCpuBuffer = new Float32Array(triangleVertices);

    const triangleGeoBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, triangleVerticesCpuBuffer, gl.STATIC_DRAW);

    const vertexShaderSourceCode = `#version 300 es
    precision mediump float;
    
    in vec2 vertexPosition;
    
    uniform vec2 canvasSize;
    uniform vec2 shapeLocation;
    uniform float shapeSize;

    void main() {
        vec2 finalVertexPosition = vertexPosition * shapeSize + shapeLocation;
        vec2 clipPosition = (finalVertexPosition / canvasSize) * 2.0 - 1.0;

        gl_Position = vec4(clipPosition, 0.0, 1.0);
    }`;
    
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (vertexShader === null) {
        showError("Could not allocate vertex shader");
        return;
    }
    gl.shaderSource(vertexShader, vertexShaderSourceCode);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        const compileError = gl.getShaderInfoLog(vertexShader);
        showError(`Failed to compile vertex shader - ${compileError}`);
        return;
    }

    const fragmentShaderSourceCode = `#version 300 es
    precision mediump float;
    
    out vec4 outputColor;

    void main() {
        outputColor = vec4(0.294, 0.0, 0.51, 1.0);
    }`;
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (fragmentShader === null) {
        showError("Could not allocate fragment shader");
        return;
    }
    gl.shaderSource(fragmentShader, fragmentShaderSourceCode);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        const compileError = gl.getShaderInfoLog(fragmentShader);
        showError(`Failed to compile fragment shader - ${compileError}`);
        return;
    }

    const triangleShaderProgram = gl.createProgram();
    if (triangleShaderProgram === null) {
        showError("Could not allocate program");
        return;
    }
    gl.attachShader(triangleShaderProgram, vertexShader);
    gl.attachShader(triangleShaderProgram, fragmentShader);
    gl.linkProgram(triangleShaderProgram);
    if (!gl.getProgramParameter(triangleShaderProgram, gl.LINK_STATUS)) {
        const linkError = gl.getProgramInfoLog(triangleShaderProgram);
        showError(`Failed to link shaders - ${linkError}`);
        return;
    }
    const vertexPositionAttributeLocation = gl.getAttribLocation(triangleShaderProgram, "vertexPosition");
    if (vertexPositionAttributeLocation < 0) {
        showError("Failed to get attribute location for vertexPosition");
        return;
    }

    // Output merger - merge shaded pixel fragments with exisiting output image
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    gl.clearColor(0.08, 0.08, 0.08, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Rasterizer - which pixels are part of the triangle
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Set GPU program (vertex + fragment shader pair)
    gl.useProgram(triangleShaderProgram);
    gl.enableVertexAttribArray(vertexPositionAttributeLocation);

    // Input assembler - how to read vertices from our GPU triangle buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleGeoBuffer);
    gl.vertexAttribPointer(
        /* index - which attribute to use */
        vertexPositionAttributeLocation,
        /* size - how many components in that attribute */
        2,
        /* type - what is the data type stored in the GPU buffer for this attribute */
        gl.FLOAT,
        /* normalized - determine how to convert ints to floats, if that's what we're doing */
        false,
        /* stride - how many bytes to move forward in the buffer to find the same attribute for the next vertex */
        0, // 0 = WebGL figures it out for me; actual value is 2 * Float32Array.BYTES_PER_ELEMENT
        /* offset - how many bytes should the input assembler skip into the buffer when reading attributes */
        0
    );

    // Draw call (also configures primitive assembly)
    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

try {
    moventAndColor();
} catch (e) {
    showError(`Uncaught JavaScript exception: ${e}`);
}