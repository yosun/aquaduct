using UnityEngine;
using System.Collections;

public class RotateMover : MonoBehaviour {

	public static void Rotate(GameObject go,float angle){
		go.transform.rotation *= Quaternion.Euler (0,angle,0);
	}

	public static void Move(GameObject go,Vector3 fwd){
		go.transform.position += fwd;
	}

}
