using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class TheSprouter : MonoBehaviour {

	enum SproutMode{
		Furniture,
		Garden
	}
	SproutMode sproutMode = SproutMode.Furniture;

	Dictionary<string,GameObject> dicCreatedBeans = new Dictionary<string,GameObject>();

	Dictionary<string,GameObject> dicCreatedWalls = new Dictionary<string,GameObject>();

	public GameObject goFurnitureDump;
	public GameObject goGardenDump;

	public Texture[] texWallpapers = new Texture[0];
	Texture currentWallpaper;
	public GameObject goUISelectWallpapers;

	// test functions
	public void CreateRandWall(){
		print ("wall");
		CreateWall (Time.time.ToString(),new Vector2(Random.Range (-10,10),Random.Range (-10,10)),new Vector2(Random.Range (-10,10),Random.Range (-10,10)));
	}

	//TODO test this
	public void CreateRandFurniture(){
		print ("furniture");
		string randname = goFurnitureDump.transform.GetChild (Random.Range (0,goFurnitureDump.transform.childCount)).name;
		print (randname);
		SproutReceiveBean (Time.time.ToString(),randname,new Vector2(Random.Range (-10,10),Random.Range(-10,10)),Random.Range(0,360f));
	}

	void Awake(){
		AssignCurrentDefaultWallpaper("8134");
	}

	public void SproutReceiveBean(string id,string itemtype,Vector2 pos,float angle){
		if(dicCreatedBeans.ContainsKey(id)){
			MoveRotateObject(dicCreatedBeans[id],new Vector3(pos.x,0,pos.y),angle);
		}else{
			CreateObject (id,itemtype,new Vector3(pos.x,0,pos.y),angle);
		}
	}

	public void SproutReceiveWall(string id,Vector2 startpoint,Vector2 endpoint){
		if(dicCreatedWalls.ContainsKey(id)){
			ModWall(id,startpoint,endpoint);
		}else{
			CreateWall(id,startpoint,endpoint);
		}
	}

	public void SwitchModes(string which){
		if(which == "furniture"){
			sproutMode = SproutMode.Furniture;
			goUISelectWallpapers.SetActive(true);
		}else if(which == "garden"){
			sproutMode = SproutMode.Garden;
			goUISelectWallpapers.SetActive(false);
		}
	}

	void MoveRotateObject(GameObject g,Vector3 pos,float angle){
		g.transform.position = pos;
		g.transform.rotation = Quaternion.Euler (0,angle,0);
	}

	void CreateObject(string id,string itemtype,Vector3 pos,float angle){
		GameObject go = CreateFromType(itemtype);
		go.name = id;
		MoveRotateObject (go,pos,angle);
		dicCreatedBeans.Add (id,go);
	}

	private GameObject CreateFromType(string type){
		GameObject go = new GameObject(); 
		if(sproutMode == SproutMode.Furniture){
			Transform t = goFurnitureDump.transform.Find(type); print (type);
			if(t!=null)
			go = GameObject.Instantiate(t.gameObject) as GameObject;
		}else if(sproutMode == SproutMode.Garden){
			Transform t = goGardenDump.transform.Find (type);
			if(t!=null)
			go = GameObject.Instantiate(t.gameObject) as GameObject;
		}
		return go;
	}

	void ModWall(string id,Vector2 startpoint,Vector2 endpoint){
		Texture wallpaper = dicCreatedWalls[id].renderer.material.mainTexture;
		Destroy (dicCreatedWalls[id].gameObject);
		GameObject go = MeshBuilder.DrawWall(id,startpoint,endpoint);
		AssignWallpaper(go,wallpaper);
		dicCreatedWalls[id] = go;
	}

	GameObject CreateWall(string id,Vector2 startpoint,Vector2 endpoint){
		GameObject go = MeshBuilder.DrawWall(id,startpoint,endpoint);
		AssignWallpaper(go,currentWallpaper);
		dicCreatedWalls.Add (id,go);
		return go;
	}

	public void AssignCurrentDefaultWallpaper(string name){
		for(int i=0;i<texWallpapers.Length;i++){
			if(texWallpapers[i].name == name)
				currentWallpaper = texWallpapers[i];
		}
	}

	public void AssignWallpaper(GameObject wall,Texture tex){
		wall.renderer.material.mainTexture = tex;
		//wall.renderer.material.SetTextureScale("_MainTex",new Vector2(3,1));
	}

}
