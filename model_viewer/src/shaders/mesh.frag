// Fragment shader
#version 150

in vec3 v_normal;
in vec3 v_light;
in vec3 v_view;

uniform vec3 u_diffuse_color;
uniform vec3 u_specular_color;
uniform vec3 u_ambient_color;
uniform float u_specular_power;
uniform vec3 u_light_color;

uniform bool u_show_normals;
uniform bool u_gamma_correction;

out vec4 frag_color;

vec3 linear_to_gamma(vec3 color)
{
return pow(color, vec3(1.0 / 2.2));
}

void main()
{
    vec3 N = normalize(v_normal);
	vec3 L = normalize(v_light);
	vec3 V = normalize(v_view);
	vec3 H = normalize(v_light + v_view);

	vec3 diffuse = u_diffuse_color*u_light_color*max(N*L, 0);

	vec3 specular = (u_specular_power + 8 / 8) * u_specular_color*u_light_color*pow(dot(N, H), u_specular_power);
	vec4 color;


	color = vec4(u_ambient_color + diffuse + specular, 1.0f);

	if (u_gamma_correction) {
		color.rgb = linear_to_gamma(color.rgb);
	}

	if (u_show_normals) {
		color = vec4(0.5 * N + 0.5, 1.0);
	}

    frag_color = color;
}
