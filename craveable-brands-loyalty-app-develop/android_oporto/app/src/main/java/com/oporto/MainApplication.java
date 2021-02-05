package com.oporto;

import android.app.Application;
import android.support.multidex.MultiDex;
import android.support.multidex.MultiDexApplication;
import android.content.Context;

import com.facebook.react.ReactApplication;
//import com.robinpowered.react.ScreenBrightness.ScreenBrightnessPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.horcrux.svg.SvgPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;

import com.reactlibrary.RNBluedotPackage;
import com.reactlibrary.RNExactTargetPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends MultiDexApplication implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
//            new ScreenBrightnessPackage(),
          new LinearGradientPackage(),
          new RNFirebasePackage(),
          new RNFirebaseAnalyticsPackage(),
          new RNFirebaseCrashlyticsPackage(),
          new RNFirebaseFirestorePackage(),
          new RNFirebaseAuthPackage(),
          new RCTCameraPackage(),
          new RNSensitiveInfoPackage(),
          new ReactNativePushNotificationPackage(),
          new MapsPackage(),
          new RNDeviceInfo(),
          new SvgPackage(),
          new RNExactTargetPackage(),
          new RNBluedotPackage(),
          new RNFirebaseLinksPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  protected void attachBaseContext(Context context) {
    super.attachBaseContext(context);
    MultiDex.install(this);
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
