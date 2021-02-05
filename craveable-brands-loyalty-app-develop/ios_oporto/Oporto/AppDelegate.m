/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
//#import "Orientation.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <React/RCTPushNotificationManager.h>
#import "RNFirebaseLinks.h"
#import <Firebase.h>
#import <JB4a-SDK/ETPush.h>

@implementation AppDelegate

//- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
//  return [Orientation getOrientation];
//}

// Deep Links
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<NSString *, id> *)options {
  return [RNFirebaseLinks application:application
                              openURL:url
                              options:options];
}

// Deep Links
- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray *))restorationHandler {
  return [RNFirebaseLinks application:application
                 continueUserActivity:userActivity
                   restorationHandler:restorationHandler];
}

// Required to register for notifications
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];

  // Notify Marketing Cloud
  NSLog(@"PushNotifications: didRegisterUserNotificationSettings");
  [[ETPush pushManager] didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  NSLog(@"deviceToken: %@", deviceToken);
  [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];

  // Notify Marketing Cloud
  NSLog(@"PushNotifications: didFailToRegisterForRemoteNotificationsWithDeviceToken");
  [[ETPush pushManager] registerDeviceToken:deviceToken];
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RCTPushNotificationManager didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [RCTPushNotificationManager didFailToRegisterForRemoteNotificationsWithError:error];

  // Notify Marketing Cloud
  NSLog(@"PushNotifications: didFailToRegisterForRemoteNotificationsWithError");
  [[ETPush pushManager] applicationDidFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [RCTPushNotificationManager didReceiveLocalNotification:notification];
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  NSURL *jsCodeLocation;

   jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
//   Use this for production bundle builds
//    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Chicken Loyalty"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  /**
   * Add in Deep linking
   */
  [FIROptions defaultOptions].deepLinkURLScheme = @"com.presentcompany.loyaltyapp";
  
  /**
   * Set the status bar color
   */
  [application setStatusBarHidden:NO];
  
  [[UIApplication sharedApplication] setStatusBarStyle:UIStatusBarStyleLightContent];
  
  UIView *statusBar = [[[UIApplication sharedApplication] valueForKey:@"statusBarWindow"] valueForKey:@"statusBar"];
  
  if ([statusBar respondsToSelector:@selector(setBackgroundColor:)]) {
    UIColor* statusBarColor = [UIColor colorWithRed:34.0f/255.0f
                                         green:34.0f/255.0f
                                          blue:34.0f/255.0f
                                         alpha:1.0f];
    statusBar.backgroundColor = statusBarColor;
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
