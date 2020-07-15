package com.awesomeproject;

import com.facebook.react.ReactActivity;
// import com.github.wumke.RNImmediatePhoneCall.RNImmediatePhoneCallPackage;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
      // RNImmediatePhoneCallPackage.onRequestPermissionsResult(requestCode, permissions, grantResults); // very important event callback
      super.onRequestPermissionsResult(requestCode, permissions, grantResults);
  } 
  @Override
  protected String getMainComponentName() {
    return "AwesomeProject";
  }
}
