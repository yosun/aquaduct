using UnityEngine;
using System.Collections;

public class KeyController : MonoBehaviour {

	public static bool CheckKeyLeft(){
		if(Input.GetKey (KeyCode.LeftArrow)){
			return true;
		}
		return false;
	}
	
	public static bool CheckKeyRight(){
		if(Input.GetKey (KeyCode.RightArrow)){
			return true;
		}
		return false;
	}
	
	public static bool CheckKeyUp(){
		if(Input.GetKey (KeyCode.UpArrow)){
			return true;
		}
		return false;
	}
	
	public static bool CheckKeyDown(){
		if(Input.GetKey (KeyCode.DownArrow)){
			return true;
		}
		return false;
	}

}
