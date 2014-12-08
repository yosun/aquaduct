using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class MeshBuilder
{
	private List<Vector3> m_Vertices = new List<Vector3>();
	public List<Vector3> Vertices { get { return m_Vertices; } }
	
	private List<Vector3> m_Normals = new List<Vector3>();
	public List<Vector3> Normals { get { return m_Normals; } }
	
	private List<Vector2> m_UVs = new List<Vector2>();
	public List<Vector2> UVs { get { return m_UVs; } }
	
	private List<int> m_Indices = new List<int>();

	public Vector3 lineStart;
	public Vector3 lineEnd;
	
	public void AddTriangle(int index0, int index1, int index2)
	{
		m_Indices.Add(index0);
		m_Indices.Add(index1);
		m_Indices.Add(index2);
	}
	
	public Mesh CreateMesh()
	{
		Mesh mesh = new Mesh();
		
		mesh.vertices = m_Vertices.ToArray();
		mesh.triangles = m_Indices.ToArray();
		
		//Normals are optional. Only use them if we have the correct amount:
		if (m_Normals.Count == m_Vertices.Count)
			mesh.normals = m_Normals.ToArray();
		
		//UVs are optional. Only use them if we have the correct amount:
		if (m_UVs.Count == m_Vertices.Count)
			mesh.uv = m_UVs.ToArray();
		
		mesh.RecalculateBounds();
		
		return mesh;
	}

	public static void BuildQuad(MeshBuilder meshBuilder, Vector3 offset, 
	               Vector3 widthDir, Vector3 lengthDir)
	{
		Vector3 normal = Vector3.Cross(lengthDir, widthDir).normalized;
		BuildQuadForceNormal (meshBuilder, offset, widthDir,lengthDir, normal);
	}

	public static void BuildQuadForceNormal(MeshBuilder meshBuilder,Vector3 offset,
	               Vector3 widthDir, Vector3 lengthDir, Vector3 normal){
		
		meshBuilder.Vertices.Add(offset);
		meshBuilder.UVs.Add(new Vector2(0.0f, 0.0f));
		meshBuilder.Normals.Add(normal);
		
		meshBuilder.Vertices.Add(offset + lengthDir);
		meshBuilder.UVs.Add(new Vector2(0.0f, 1.0f));
		meshBuilder.Normals.Add(normal);
		
		meshBuilder.Vertices.Add(offset + lengthDir + widthDir);
		meshBuilder.UVs.Add(new Vector2(1.0f, 1.0f));
		meshBuilder.Normals.Add(normal);
		
		meshBuilder.Vertices.Add(offset + widthDir);
		meshBuilder.UVs.Add(new Vector2(1.0f, 0.0f));
		meshBuilder.Normals.Add(normal);
		
		int baseIndex = meshBuilder.Vertices.Count - 4;
		
		meshBuilder.AddTriangle(baseIndex, baseIndex + 1, baseIndex + 2);
		meshBuilder.AddTriangle(baseIndex, baseIndex + 2, baseIndex + 3);

		meshBuilder.AddTriangle(baseIndex + 1,baseIndex,baseIndex + 2);
		meshBuilder.AddTriangle(baseIndex + 2, baseIndex ,baseIndex + 3);
	}

	public static Mesh MakeBox (float m_Width,float m_Length,float m_Height) {
		MeshBuilder meshBuilder = new MeshBuilder();
		
		Vector3 upDir = Vector3.up * m_Height;
		Vector3 rightDir = Vector3.right * m_Width;
		Vector3 forwardDir = Vector3.forward * m_Length;
		
		Vector3 nearCorner = Vector3.zero;
		Vector3 farCorner = upDir + rightDir + forwardDir;
		
		MeshBuilder.BuildQuad(meshBuilder, nearCorner, forwardDir, rightDir);
		MeshBuilder.BuildQuad(meshBuilder, nearCorner, rightDir, upDir);
		MeshBuilder.BuildQuad(meshBuilder, nearCorner, upDir, forwardDir);
		
		MeshBuilder.BuildQuad(meshBuilder, farCorner, -rightDir, -forwardDir);
		MeshBuilder.BuildQuad(meshBuilder, farCorner, -upDir, -rightDir);
		MeshBuilder.BuildQuad(meshBuilder, farCorner, -forwardDir, -upDir);
		
		Mesh mesh = meshBuilder.CreateMesh();
		return mesh;
	}

	public static GameObject MakeBoxAtLocationBase(float w,float l,float h,Vector3 p){
		Mesh mesh = MakeBox (w,l,h);
		GameObject go = CreateRenderedObject (mesh, p - new Vector3(0, h * 0.5f,0));
		return go;
	}


	// TODO this is borked 
	public static GameObject DrawLine(string name,Vector2 startpoint,Vector2 endpoint){
		MeshBuilder meshBuilder = new MeshBuilder();

		Vector3 start = new Vector3 (startpoint.x, 0, startpoint.y);
		Vector3 end = new Vector3 (endpoint.x, 0, endpoint.y);

		float l = endpoint.y - startpoint.y;
		float w = endpoint.x - startpoint.x;

		Vector3 width = 0.1f * (start + end);

		Vector3 length = end - start;

		Vector3 offset = Vector3.zero;//0.5f * (start + end);

		MeshBuilder.BuildQuadForceNormal (meshBuilder,offset,width,length, new Vector3(0,1,0));
		//MeshBuilder.BuildQuad (meshBuilder, offset, width, length);

		Mesh mesh = meshBuilder.CreateMesh ();

		GameObject go = CreateRenderedObject (mesh,offset);
		go.name = name;
		return go;
	}

	public static GameObject DrawWall(string name,Vector2 startpoint,Vector3 endpoint){
		MeshBuilder mb = new MeshBuilder ();

		Vector3 start = new Vector3 (startpoint.x, 0, startpoint.y);
		Vector3 end = new Vector3 (endpoint.x, 0, endpoint.y);

		Vector3 width = end - start;
		Vector3 height = new Vector3(0,1f,0);

		MeshBuilder.BuildQuad (mb, start, width, height);

		Mesh mesh = mb.CreateMesh ();
		
		GameObject go = CreateRenderedObject (mesh,Vector3.zero);
		go.name = name;

		//DrawLine (name, startpoint, endpoint);

		return go;

	}

	

	public static GameObject CreateRenderedObject(Mesh mesh,Vector3 p){
		GameObject go = CreateRenderedObjectCustomMaterial (mesh, p, new Material( Shader.Find ("Unlit/Texture") ));
		return go;
	}

	public static GameObject CreateRenderedObjectCustomMaterial(Mesh mesh,Vector3 p,Material m){
		GameObject go = new GameObject ();
		go.AddComponent<MeshFilter> ();
		MeshFilter meshfilter = go.GetComponent<MeshFilter> ();
		meshfilter.sharedMesh = mesh;
		go.AddComponent<MeshRenderer> ();
		go.transform.position = p ;
		MeshRenderer mr = go.GetComponent<MeshRenderer> ();
		mr.material = m;
		return go;
	}

}
