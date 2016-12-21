//>>built
require({cache:{"url:esri/layers/vectorTiles/views/vectorTiles/renderers/shaders/lineShader.vs.glsl":"/* The implementation of the renderer is based on the article and implementation of MB described here:\r\n* https://www.mapbox.com/blog/drawing-antialiased-lines/\r\n*/\r\n\r\nattribute vec2 a_pos;\r\nattribute vec2 a_offset;\r\nattribute float a_accumulatedDistance;\r\n\r\n// the relative transformation of a vertex given in tile coordinates to a relative normalized coordinate\r\n// relative to the tile's upper left corner\r\n// the extrusion vector.\r\nuniform highp mat4 u_transformMatrix;\r\n// the extrude matrix which is responsible for the 'anti-zoom' as well as the rotation\r\nuniform highp mat4 u_extrudeMatrix;\r\n// u_normalized_origin is the tile's upper left corner given in normalized coordinates\r\nuniform highp vec2 u_normalized_origin;\r\n// the z of the layer. Given by the order of the layers in the style\r\nuniform mediump float u_depth;\r\n// the inset and outset of the line\r\nuniform mediump float u_lineHalfWidth;\r\n// the interpolated normal to the line. the information is packed into the LSB of the vertex coordinate\r\nvarying mediump vec2 v_normal;\r\n// the accumulated distance along the line. We need this information in order to render the dashes.\r\nvarying highp float v_accumulatedDistance;\r\n\r\nconst float scale \x3d 1.0 / 31.0;\r\n\r\nvoid main()\r\n{\r\n  // extract the normal from the list significat bit. It has a value of 0 or 1, but we need it to be either -1 or 1 therefore\r\n  // we need to change 0 to -1.\r\n  lowp vec2 normal \x3d mod(a_pos, 2.0);\r\n  normal.y \x3d normal.y \x3d\x3d 0.0 ? -1.0 : 1.0;\r\n  v_normal \x3d normal;\r\n\r\n  // calculate the relative distance from the centerline to the edge of the line. Since offset is given in integers (for the\r\n  // sake of using less attribute memory, we need to scale it back to the original range of ~ 0: 1)\r\n  lowp vec2 dist \x3d u_lineHalfWidth * a_offset * scale;\r\n\r\n  // transform the vertex\r\n  gl_Position \x3d vec4(u_normalized_origin, u_depth, 0.0) + u_transformMatrix * vec4(floor(a_pos * 0.5), 0.0, 1.0) + u_extrudeMatrix * vec4(dist, 0.0, 0.0);\r\n\r\n  // the accumulated distance will be used to calculate the dashes (or the no-data...)\r\n  v_accumulatedDistance \x3d a_accumulatedDistance;\r\n}\r\n",
"url:esri/layers/vectorTiles/views/vectorTiles/renderers/shaders/lineShader.fs.glsl":"/* The implementation of the renderer is based on the article and implementation of MB described here:\r\n* https://www.mapbox.com/blog/drawing-antialiased-lines/\r\n*/\r\n\r\nuniform mediump float u_lineHalfWidth;\r\nuniform lowp vec4 u_color;\r\nuniform mediump vec2 u_dasharray;\r\nuniform lowp float u_blur;\r\n\r\nvarying mediump vec2 v_normal;\r\nvarying highp float v_accumulatedDistance;\r\n\r\nvoid main()\r\n{\r\n  // dist represent the distance of the fragment from the line. 1.0 or -1.0 will be the values on the edge of the line,\r\n  // and any value in between will be inside the line (the sign represent the direction - right or left).\r\n  // since u_linewidth.s (half line width) is represented in pixels, dist is also given in pixels\r\n  mediump float fragDist \x3d length(v_normal) * u_lineHalfWidth;\r\n\r\n  // calculate the alpha given the difference between the line-width and the distance of the fragment from the center-line.\r\n  // We need to count for both sides of the line.\r\n  lowp float alpha \x3d clamp( min(fragDist + u_blur + 1.0, u_lineHalfWidth - fragDist) / u_blur, 0.0, 1.0);\r\n\r\n  // now calculate the dashes given the accumulated distance of the line:\r\n  // start with calculating a normalized position along the line\r\n  lowp float dashPos \x3d  mod(v_accumulatedDistance, u_dasharray.x + u_dasharray.y);\r\n\r\n  // calculate the contribution to the alpha of the dash part. It is provided by the shortest portion of the position along the dash.\r\n  // we must clamp since the value might be bigger than 1 or smaller than zero (when over a dash).\r\n  //   | \x3c--- pos along the dash part\r\n  // -------_______-------_______\r\n  // when the dashPos is over the 'gap' part of the dash u_dasharray.x - dashPos is negative and therefore the alpha will\r\n  // get clamped to zero.\r\n  // when u_dasharray.x - dashPos is positive, or when dashPos is smaller than 1.0, it gives us a soft edge to each dash part.\r\n  // along the direction of the line.\r\n  lowp float dashAlpha \x3d clamp( min(dashPos, u_dasharray.x - dashPos), 0.0, 1.0);\r\n\r\n  // if we don't have a no-data part to the dash then it is a solid line\r\n  dashAlpha \x3d max(sign(-u_dasharray.y), dashAlpha); //sign(-u_dasharray.y) \x3e 0.0 ? 1.0 : dashAlpha;\r\n  // finally multiply the fragment's alpha by the calculated dash-alpha\r\n  alpha *\x3d dashAlpha;\r\n\r\n  // output the fragment color\r\n  gl_FragColor \x3d vec4(u_color.rgb, alpha * u_color.a);\r\n}\r\n",
"url:esri/layers/vectorTiles/views/vectorTiles/renderers/shaders/lineJoinShader.vs.glsl":"attribute vec2 a_pos;\r\n\r\nuniform highp mat4 u_transformMatrix;\r\nuniform highp vec2 u_normalized_origin;\r\nuniform highp float u_depth;\r\nuniform highp vec2 u_screen;\r\nuniform mediump float u_size;\r\nuniform mediump float u_pixelRatio;\r\n\r\nvarying mediump vec2 v_vertexPosition;\r\n\r\nvoid main()\r\n{\r\n  gl_PointSize \x3d u_pixelRatio * u_size;\r\n  gl_Position \x3d vec4(u_normalized_origin, u_depth, 0.0) + u_transformMatrix * vec4(a_pos, 0.0, 1.0);\r\n\r\n  // calculate the vertex position in pixels (we need to add one in order to shift the origin from the center of the viewport)\r\n  v_vertexPosition \x3d (gl_Position.xy + 1.0) * u_screen;\r\n}\r\n",
"url:esri/layers/vectorTiles/views/vectorTiles/renderers/shaders/lineJoinShader.fs.glsl":"uniform lowp vec4 u_color;\r\nuniform mediump float u_lineHalfWidth;\r\nuniform mediump float u_oneOverPixelRatio;\r\n\r\nvarying mediump vec2 v_vertexPosition;\r\n\r\nvoid main()\r\n{\r\n  // get the distance of the current fragment from the actual vertex\r\n  mediump float fragDist \x3d length(v_vertexPosition - u_oneOverPixelRatio * gl_FragCoord.xy);\r\n\r\n  // rounding the quare: calculate the alpha given the difference between the line-width and the distance of the fragment\r\n  // from the center-line. We will end up with a nice round circle with a soft edge.\r\n  lowp float alpha \x3d clamp(u_lineHalfWidth - fragDist, 0.0, 1.0);\r\n\r\n  // finally output the fragment color\r\n  gl_FragColor \x3d vec4(u_color.rgb, alpha * u_color.a);\r\n}\r\n"}});
define("esri/layers/vectorTiles/views/vectorTiles/renderers/LineRenderer","require exports ../../../core/libs/gl-matrix/mat4 ../../../core/libs/gl-matrix/vec4 ../../../core/libs/gl-matrix/vec3 ../../../core/libs/gl-matrix/vec2 dojo/text!./shaders/lineShader.vs.glsl dojo/text!./shaders/lineShader.fs.glsl dojo/text!./shaders/lineJoinShader.vs.glsl dojo/text!./shaders/lineJoinShader.fs.glsl ../../webgl/Program ../../webgl/VertexArrayObject ../GeometryUtils".split(" "),function(D,E,s,x,y,t,z,A,B,C,u,
v,w){return function(){function m(){this._joinAttributeLocations={a_pos:0,a_vertexOffset:1};this._triangleAttributeLocations={a_pos:0,a_offset:1,a_accumulatedDistance:2};this._initialized=!1;this._viewProjMat=s.create();this._offsetVector=y.create();this._screenSize=t.create();this._color=x.create();this._dashArray=t.create()}m.prototype.render=function(b,a,c,k,l,h,m,r){if(0!==a.triangleElementCount){this._initialized||this._initialize(b);var n=l.tileTransform.transform,p=l.coordRange/512,g=h.getPaintValue("line-translate",
c);if(0!==g[0]||0!==g[1]){s.copy(this._viewProjMat,l.tileTransform.transform);var n=g[0],g=g[1],d=0,e=0,e=(1<<l.key.level)/Math.pow(2,c)*p,d=k.rotation;if(1===h.getPaintValue("line-translate-anchor",c))var q=Math.sin(w.C_DEG_TO_RAD*-d),f=Math.cos(w.C_DEG_TO_RAD*-d),d=e*(n*f-g*q),e=e*(n*q+g*f);else d=e*n,e*=g;this._offsetVector[0]=d;this._offsetVector[1]=e;this._offsetVector[2]=0;s.translate(this._viewProjMat,this._viewProjMat,this._offsetVector);n=this._viewProjMat}d=1/r;g=h.getPaintValue("line-blur",
c)+d;e=h.getPaintValue("line-width",c);d=0.5*(e+d);q=h.getPaintValue("line-opacity",c);f=h.getPaintValue("line-color",c);this._color[0]=f[0];this._color[1]=f[1];this._color[2]=f[2];this._color[3]=f[3]*q;if(1<d&&0<a.joinCount&&(this._screenSize[0]=0.5*k.width,this._screenSize[1]=0.5*k.height,k=Math.ceil(2*d),q=d-0.25,f=this._getJoinsVAO(b,l)))b.bindVAO(f),b.bindProgram(this._joinProgram),f=1/(0<r?r:1),this._joinProgram.setUniformMatrix4fv("u_transformMatrix",n),this._joinProgram.setUniform2fv("u_normalized_origin",
l.tileTransform.displayCoord),this._joinProgram.setUniform1f("u_depth",h.z),this._joinProgram.setUniform2fv("u_screen",this._screenSize),this._joinProgram.setUniform1f("u_size",k),this._joinProgram.setUniform4fv("u_color",this._color),this._joinProgram.setUniform1f("u_lineHalfWidth",q),this._joinProgram.setUniform1f("u_pixelRatio",r),this._joinProgram.setUniform1f("u_oneOverPixelRatio",f),b.drawArrays(0,a.joinStart,a.joinCount),b.bindVAO();c=h.getPaintValue("line-dasharray",c);2>c.length&&(c=[1,-1]);
p*=e;this._dashArray[0]=p*c[0];this._dashArray[1]=p*c[1];if(p=this._getTrianglesVAO(b,l))b.bindVAO(p),b.bindProgram(this._triangleslProgram),this._triangleslProgram.setUniformMatrix4fv("u_transformMatrix",n),this._triangleslProgram.setUniformMatrix4fv("u_extrudeMatrix",m),this._triangleslProgram.setUniform2fv("u_normalized_origin",l.tileTransform.displayCoord),this._triangleslProgram.setUniform1f("u_depth",h.z),this._triangleslProgram.setUniform4fv("u_color",this._color),this._triangleslProgram.setUniform1f("u_lineHalfWidth",
d),this._triangleslProgram.setUniform2fv("u_dasharray",this._dashArray),this._triangleslProgram.setUniform1f("u_blur",g),b.drawElements(4,a.triangleElementCount,5125,12*a.triangleElementStart),b.bindVAO()}};m.prototype._initialize=function(b){if(this._initialized)return!0;var a=new u(b,z,A,this._triangleAttributeLocations);b=new u(b,B,C,this._joinAttributeLocations);this._triangleslProgram=a;this._trianglesVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,
divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_accumulatedDistance",count:1,type:5122,offset:6,stride:8,normalized:!1,divisor:0}]};this._joinProgram=b;this._joinVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]};return this._initialized=!0};m.prototype._getTrianglesVAO=function(b,a){if(a.lineTrianglesVertexArrayObject)return a.lineTrianglesVertexArrayObject;var c=a.lineVertexBuffer,k=a.lineTrianglesIndexBuffer;
if(!c||!k)return null;a.lineTrianglesVertexArrayObject=new v(b,this._triangleAttributeLocations,this._trianglesVertexAttributes,{geometry:c},k);return a.lineTrianglesVertexArrayObject};m.prototype._getJoinsVAO=function(b,a){if(a.lineJoinsVertexArrayObject)return a.lineJoinsVertexArrayObject;var c=a.lineJoinVertexBuffer;if(!c)return null;a.lineJoinsVertexArrayObject=new v(b,this._joinAttributeLocations,this._joinVertexAttributes,{geometry:c});return a.lineJoinsVertexArrayObject};return m}()});