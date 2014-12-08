using UnityEngine;
using System.Collections;

public class TheIO : MonoBehaviour {

	public WWWGetPost wwwgetpost; 
	public TheSprouter ts; 

	string lasttime="0";

	float lastpoll=0f;

	void Update(){
		if (lastpoll > 1f) {
			lastpoll = 0;
			StartCoroutine(wwwgetpost.FetchData ("http://localhost/bss/aquaduct/server.read.php?lasttime="+lasttime,ProcessAccess));
		}
		lastpoll += Time.deltaTime;
	}

	void ProcessAccess(string text){
		if (text.Length < 20)
						return;
		JSONObject json = new JSONObject(text);

		lasttime = json["timestamp"].str; print (lasttime);

		JSONObject jsondata = json ["data"];
		for(int i=0;i<jsondata.Count;i++){//print (jsondata[i]);
			ProcessEachAccess(jsondata[i].str);
		}
	}

	void ProcessEachAccess(string text){//print (text); 
		JSONObject jsoneach = new JSONObject(text); 
		string id = jsoneach["id"].str;
		string type = jsoneach["type"].str;
		float x = jsoneach["x"].n;
		float y = jsoneach["y"].n;

		if(type == "wall"){
			float dx = x+jsoneach["dx"].n;
			float dy = y+jsoneach["dy"].n;
			Vector2 start = new Vector2(x,y);
			Vector2 end = new Vector2(dx,dy);
			ConvertCoordinates(ref start,ref end);
			ts.SproutReceiveWall(id,start,end);	
		}else {
			float angle = jsoneach["angle"].n; angle *= 180 / Mathf.PI; 
			Vector2 coord = new Vector2(x,y); //print (angle + " " + coord);
			ConvertCoordinate(ref coord);
			ts.SproutReceiveBean(id,type,coord,angle);
		}
	}

	void ConvertCoordinate(ref Vector2 coord){
		coord *= 0.01f;
		coord -= new Vector2 (-5, 5);
	}

	void ConvertCoordinates(ref Vector2 start,ref Vector2 end){
		start *= 0.01f;
		start -= new Vector2 (-5, 5);
		end *= 0.01f;
		end -= new Vector2 (-5, 5);
	}

}
