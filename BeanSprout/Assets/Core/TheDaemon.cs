using UnityEngine;
using System.Collections;
using UnityEngine.UI;

public class TheDaemon : MonoBehaviour {

	enum TheViewModes{
		FirstPerson,
		ThirdPerson
	}
	TheViewModes tvm = TheViewModes.ThirdPerson;

	public GameObject goCamFirstPerson;
	public GameObject goCamThirdPerson;

	public Image imgCamSprite;
	public Sprite texFirstPerson;
	public Sprite texThirdPerson;

	void Start () {
	
	}

	void Update () {
		if(tvm == TheViewModes.FirstPerson){
			if(KeyController.CheckKeyLeft()){
				RotateMover.Rotate (goCamFirstPerson,-1f);
			}else if(KeyController.CheckKeyRight ()){
				RotateMover.Rotate (goCamFirstPerson,1f);
			}

			if(KeyController.CheckKeyUp ()){
				RotateMover.Move (goCamFirstPerson,goCamFirstPerson.transform.forward*0.01f);
			}else if(KeyController.CheckKeyDown ()){
				RotateMover.Move (goCamFirstPerson,-goCamFirstPerson.transform.forward*0.01f);
			}
		}else if(tvm == TheViewModes.ThirdPerson){
			if(KeyController.CheckKeyUp ()){
				goCamThirdPerson.transform.rotation *= Quaternion.Euler (-0.1f,0,0);
			}else if(KeyController.CheckKeyDown()){
				goCamThirdPerson.transform.rotation *= Quaternion.Euler (0.1f,0,0);
			}

			if(KeyController.CheckKeyRight()){
				goCamThirdPerson.transform.rotation *= Quaternion.Euler (0,0.1f,0);
			}else if(KeyController.CheckKeyLeft ()){
				goCamThirdPerson.transform.rotation *= Quaternion.Euler (0,-0.1f,0);
			}
		}
	}

	public void ChangeModes(){
		if(tvm == TheViewModes.FirstPerson){
			tvm = TheViewModes.ThirdPerson;

			goCamThirdPerson.camera.enabled = true;
			goCamFirstPerson.camera.enabled = false;

			imgCamSprite.sprite = texThirdPerson;
		}else if(tvm == TheViewModes.ThirdPerson){
			tvm = TheViewModes.FirstPerson;
			
			goCamFirstPerson.camera.enabled = true;
			goCamThirdPerson.camera.enabled = false;

			imgCamSprite.sprite = texFirstPerson;
		}
	}

}
