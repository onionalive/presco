
package com.reactlibrary;

import android.support.annotation.Nullable;
import android.content.Context;
import android.content.Intent;
import android.app.PendingIntent;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.TimeZone;
import java.util.UUID;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import com.bluedot.BDSalesforceIntegrationWrapper.BDZoneEvent;
import com.bluedot.BDSalesforceIntegrationWrapper.ZoneEventReportListener;
import com.bluedot.BDSalesforceIntegrationWrapper.ZoneEventReporter;

import au.com.bluedot.application.model.Proximity;
import au.com.bluedot.application.model.geo.Fence;
import au.com.bluedot.point.ApplicationNotificationListener;
import au.com.bluedot.point.net.engine.BDError;
import au.com.bluedot.point.ServiceStatusListener;
import au.com.bluedot.point.net.engine.BeaconInfo;
import au.com.bluedot.point.net.engine.LocationInfo;
import au.com.bluedot.point.net.engine.ZoneInfo;
import au.com.bluedot.point.net.engine.ServiceManager;

import com.facebook.react.ReactActivity;

import com.facebook.react.bridge.ReadableMap;

import com.oporto.R;

import com.exacttarget.etpushsdk.ETException;
import com.exacttarget.etpushsdk.ETPush;

public class RNBluedotModule extends ReactContextBaseJavaModule implements
  ServiceStatusListener,
  ApplicationNotificationListener,
  ZoneEventReportListener {

  private final ReactApplicationContext reactContext;
  private Context context;
  private ServiceManager serviceManager;
  private String apiKey;
  private String packageName;
  private String emailId;

  public RNBluedotModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    this.context = reactContext.getApplicationContext();
  }

  @Override
  public String getName() {
    return "Bluedot";
  }

  private void setApiKey(String apiKey) {
    this.apiKey = apiKey;
  }

  private String getApiKey() {
    return apiKey;
  }

  private void setPackageName(String packageName) {
    this.packageName = packageName;
  }

  private String getPackageName() {
    return packageName;
  }

  private void setEmailId(String emailId) {
    this.emailId = emailId;
  }

  private String getEmailId() {
    return emailId;
  }

  @ReactMethod
  public void initializeBluedot(ReadableMap bluedotConfig) {
    System.out.println("Bluedot: Initialising");
    
    // Get an instance of ServiceManager to access the Bluedot Point Service
    serviceManager = ServiceManager.getInstance(this.context);

    // Android O handling - Set the foreground Service Notification which will fire only if running on Android O and above
    Intent actionIntent = new Intent(this.context, ReactActivity.class);
    PendingIntent pendingIntent = PendingIntent.getActivity(this.context, 0, actionIntent, PendingIntent.FLAG_UPDATE_CURRENT );
    serviceManager.setForegroundServiceNotification(R.mipmap.ic_launcher, this.context.getString(R.string.foreground_notification_title), this.context.getString(R.string.foreground_notification_text), pendingIntent);
    
    //Check the Bluedot Point Service is currently running, otherwise start it
    if(!serviceManager.isBlueDotPointServiceRunning()){
      serviceManager.sendAuthenticationRequest(bluedotConfig.getString("packageName"), bluedotConfig.getString("apiKey"), bluedotConfig.getString("username"), this);
      setApiKey(bluedotConfig.getString("apiKey"));
      setPackageName(bluedotConfig.getString("packageName"));
      setEmailId(bluedotConfig.getString("username"));
    }
  }

  @Override
  public void onRuleUpdate(final List<ZoneInfo> zoneInfos) {
    System.out.println("Bluedot: Rules updated");
  }

  @Override
  public void onBlueDotPointServiceStartedSuccess() {
    System.out.println("Bluedot: Point Service Started"); 
    serviceManager.subscribeForApplicationNotification(this);
  }

  @Override
  public void onBlueDotPointServiceStop() {
    System.out.println("Bluedot: Point Service Stopped");
    serviceManager.unsubscribeForApplicationNotification(this);
  }

  @Override
  public void onBlueDotPointServiceError(final BDError bdError) {
    System.out.println("Bluedot: Point Service Error: " + bdError.getReason());
  }

  @Override
  public void onCheckIntoFence(Fence fence, ZoneInfo zoneInfo, LocationInfo location, Map<String, String> customData, boolean isCheckOut) {
    try {
      String msg = String.format("Bluedot: Fence check-in triggered: %s | %s", zoneInfo.getZoneName(), fence.getName());
      logToReact(msg);
      String subscriberKey = ETPush.getInstance().getSubscriberKey();

      BDZoneEvent bdZoneEvent = BDZoneEvent.builder()
            .setSubscriberKey(subscriberKey)
            .setApiKey(getApiKey())
            .setPackageName(getPackageName())
            .setUserName(getEmailId())
            .setZoneId(zoneInfo.getZoneId())
            .setZoneName(zoneInfo.getZoneName())
            .setFenceId(fence.getID())
            .setFenceName(fence.getName())
            .setCheckInTime(get8601formattedDate(location.getTimeStamp()))
            .setCheckInLatitude(location.getLatitude())
            .setCheckInLongitude(location.getLongitude())
            .setCheckInBearing(location.getBearing())
            .setCheckInSpeed(location.getSpeed())
            .setCustomData(customData)
            .build();
      ZoneEventReporter.getInstance().reportCheckIn(bdZoneEvent);
    } catch (IllegalStateException e) {
          e.printStackTrace();
    } catch(ETException e) {
      System.out.println(e.getMessage());
    }
  }

  @Override
  public void onCheckedOutFromFence(Fence fence, ZoneInfo zoneInfo, int dwellTime, Map<String, String> customData) {
    try {
      String msg = String.format("Bluedot: Fence check-out triggered: %s | %s", zoneInfo.getZoneName(), fence.getName());
      logToReact(msg);
      String subscriberKey = ETPush.getInstance().getSubscriberKey();

      BDZoneEvent bdZoneEvent = BDZoneEvent.builder()
            .setSubscriberKey(subscriberKey)
            .setApiKey(getApiKey())
            .setPackageName(getPackageName())
            .setUserName(getEmailId())
            .setZoneId(zoneInfo.getZoneId())
            .setZoneName(zoneInfo.getZoneName())
            .setFenceId(fence.getID())
            .setFenceName(fence.getName())
            .setCheckOutTime(get8601formattedDate(0))
            .setDwellTime(dwellTime)
            .setCustomData(customData)
            .build();
      ZoneEventReporter.getInstance().reportCheckOut(bdZoneEvent);
    } catch (IllegalStateException e) {
          e.printStackTrace();
    } catch(ETException e) {
      System.out.println(e.getMessage());
    }
  }

  @Override
  public void onCheckIntoBeacon(BeaconInfo beaconInfo, ZoneInfo zoneInfo, LocationInfo location, Proximity proximity, Map<String, String> customData, boolean isCheckOut) {
    try {
      String msg = String.format("Bluedot: Beacon check-in triggered: %s | %s", zoneInfo.getZoneName(), beaconInfo.getName());
      logToReact(msg);
      String subscriberKey = ETPush.getInstance().getSubscriberKey();

      BDZoneEvent bdZoneEvent = BDZoneEvent.builder()
            .setSubscriberKey(subscriberKey)
            .setApiKey(getApiKey())
            .setPackageName(getPackageName())
            .setUserName(getEmailId())
            .setZoneId(zoneInfo.getZoneId())
            .setZoneName(zoneInfo.getZoneName())
            .setBeaconId(beaconInfo.getId())
            .setBeaconName(beaconInfo.getName())
            .setCheckInTime(get8601formattedDate(location.getTimeStamp()))
            .setCheckInLatitude(location.getLatitude())
            .setCheckInLongitude(location.getLongitude())
            .setCheckInBearing(location.getBearing())
            .setCheckInSpeed(location.getSpeed())
            .setCustomData(customData)
            .build();
      ZoneEventReporter.getInstance().reportCheckIn(bdZoneEvent);
    } catch (IllegalStateException e) {
        e.printStackTrace();
    } catch(ETException e) {
      System.out.println(e.getMessage());
    }
  }

  @Override
  public void onCheckedOutFromBeacon(BeaconInfo beaconInfo, ZoneInfo zoneInfo, int dwellTime, Map<String, String> customData) {
    try {
      String msg = String.format("Bluedot: Beacon check-out triggered: %s | %s", zoneInfo.getZoneName(), beaconInfo.getName());
      logToReact(msg);
      String subscriberKey = ETPush.getInstance().getSubscriberKey();

      BDZoneEvent bdZoneEvent = BDZoneEvent.builder()
          .setSubscriberKey(subscriberKey)
          .setApiKey(getApiKey())
          .setPackageName(getPackageName())
          .setUserName(getEmailId())
          .setZoneId(zoneInfo.getZoneId())
          .setZoneName(zoneInfo.getZoneName())
          .setBeaconId(beaconInfo.getId())
          .setBeaconName(beaconInfo.getName())
          .setCheckOutTime(get8601formattedDate(0))
          .setDwellTime(dwellTime)
          .setCustomData(customData)
          .build();
      ZoneEventReporter.getInstance().reportCheckOut(bdZoneEvent);
    } catch (IllegalStateException e) {
        e.printStackTrace();
    } catch(ETException e) {
      System.out.println(e.getMessage());
    }
  }

  @Override
  public void onReportSuccess() {
      // Zone Check-in / Check-out event report succeed
      String msg = "Bluedot: Marketing Cloud onReportSuccess executed";
      logToReact(msg);
  }
  @Override
  public void onReportError(Error error) {
      // Zone Check-in / Check-out event report failed
      // error.getMessage() contains error details
      String msg = String.format("Bluedot: Market Cloud onReport Error - %s", error.getMessage());
      logToReact(msg);
  }

  private String get8601formattedDate(long timestamp) {
      SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.S'Z'");
      df.setTimeZone(TimeZone.getTimeZone("UTC"));
      if ( timestamp == 0) {
        return df.format(new Date());
        }
      return df.format(new Date(timestamp));
  }

  private void logToReact(String msg) {
    System.out.println(msg);
    WritableMap event = Arguments.createMap();
    event.putString("message", msg);
    sendEvent(this.reactContext, "log", event);
  }

  private void sendEvent(ReactContext reactContext, String eventName, @Nullable WritableMap params) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
  }
}
