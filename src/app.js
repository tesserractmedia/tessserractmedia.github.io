//
// start here
//
function main() {
  const canvas = document.querySelector("#app");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  const vertices = [
    0.5,  0.5,
   -0.5,  0.5,
    0.5, -0.5,
   -0.5, -0.5,];

  const indices =
  [ 0, 1, 2,
    2, 1, 3,];

  const vsource =
  `attribute vec4 position;
  void main() {
    gl_Position = position;
  }`;

  const fsource =
  `void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }`;

  vao = new VertexArray(gl);
  vao.Bind();

  shader = new Shader(gl,vsource,fsource);

  const vl = gl.getAttribLocation(shader.RendererID,"position");

  vb = new VertexBuffer(gl,vertices);
  vb.Bind();

  vbl = new VertexBufferLayout(gl);
  vbl.PushFloat(2);
  vao.AddBuffer(vb,vbl);

  ib = new IndexBuffer(gl,indices);

  shader.Bind();

  render = new Renderer(gl);

  gl.clearColor(0.0,0.0,0.0,1.0);
  render.Clear();
  render.Draw(vao,ib,shader);
}

window.onload = main;
