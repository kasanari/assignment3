// Vertex shader
#version 150
#extension GL_ARB_explicit_attrib_location : require

layout(location = 0) in vec4 a_position;
layout(location = 1) in vec3 a_normal;

uniform mat4 u_mv;
uniform vec3 u_light_position;
uniform vec3 u_light_color;

out vec3 v_normal;
out vec3 v_light;
out vec3 v_view;

uniform mat4 u_mvp;

void main()
{
    v_normal = mat3(u_mv) * a_normal;
	v_light = mat3(u_mv) * (u_light_position - a_position.xyz);
	v_view = -(mat3(u_mv) * a_position.xyz);
    gl_Position = u_mvp * a_position;
}
