#import "Bluedot.h"
#import <React/RCTConvert.h>
#import <React/RCTEventEmitter.h>
#import <BDPointSDK.h>
#import <BDSalesforceIntegrationWrapper/BDZoneEventReporter.h>
#import <JB4a-SDK/ETPush.h>
#import "KeyInfo.h"

@interface Bluedot () <BDPLocationDelegate, BDPZoneEventReporterDelegate>
@end

@implementation Bluedot
{ 
	// A default date formatter 
	NSDateFormatter  *_dateFormatter; 
} 



// Export this module and make it available in React Native
RCT_EXPORT_MODULE();



- (NSArray<NSString *> *)supportedEvents
{
	// A list of all of the event types this module emits
	return @[@"Notification"];
}



// Add a method 'initializeBluedot' which is exposed to ReactNative
RCT_REMAP_METHOD(initializeBluedot, authenticate:(NSDictionary *)bluedotConfig resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
	// Initialise Bluedot SDK
	BDLocationManager *locationManager = [ BDLocationManager instance ]; 

	// Tell the BluedotSDK that this module is going to be processing the events it emits
	locationManager.locationDelegate = self;
	locationManager.sessionDelegate = self; 

   // Setup a generic date formatter
   // Not really used - copied over from the Cordova plugin
   _dateFormatter = [ NSDateFormatter new ]; 
   [ _dateFormatter setDateFormat: @"dd-MMM-yyyy HH:mm" ]; 

   // Grab values from conf object passed from React Native
	NSString *apiKey = [RCTConvert NSString:bluedotConfig[@"apiKey"]];
	NSString *username = [RCTConvert NSString:bluedotConfig[@"username"]];
	NSString *packageName = [RCTConvert NSString:bluedotConfig[@"packageName"]];
  
  NSUserDefaults *userDefaults = [NSUserDefaults standardUserDefaults];
  
  [userDefaults setValue:apiKey forKey:@"sBDPointApiKey"];
  [userDefaults setValue:packageName forKey:@"sBDPointPackageName"];
  [userDefaults setValue:username forKey:@"sBDPointUsername"];
  [userDefaults synchronize];
  
	// Authenticate using config values
	[ BDLocationManager.instance authenticateWithApiKey: apiKey
		packageName: packageName
		username: username ];

	// Resolve promise
	resolve(@"successful");
}



- (void)applicationWillEnterForeground:(UIApplication *)application
{
	// This method implementation must be present in AppDelegate
	// when integrating Bluedot Point SDK v1.x, even if it is empty.
}

- (void)applicationDidEnterBackground:(UIApplication *)application
{
	// This method implementation must be present in AppDelegate
	// when integrating Bluedot Point SDK v1.x, even if it is empty.
}



/*
 *  Called when an authentication attempt starts
 */
- (void)willAuthenticateWithUsername: (NSString *)username
	apiKey: (NSString *)apiKey
	packageName: (NSString *)packageName
{
	NSLog( @"Bluedot: Authenticating Point service");
}

/*
 *  Called when an authentication has been succesful.
 */
- (void)authenticationWasSuccessful
{
	NSLog( @"Bluedot: Auth was successful");
}

/*
 *  Called when an authentication has been denied from the server.
 */
- (void)authenticationWasDeniedWithReason: (NSString *)reason
{
	NSLog( @"Bluedot: Auth denied with reason");
}

- (void)authenticationFailedWithError: (NSError *)error
{
	NSLog(@"Bluedot: Auth failure: %@",error);
}



/*
 *  Called when the user logs out of an authenticated session.
 */
- (void)didEndSession
{
	NSLog( @"Bluedot: Logged out" );
}

- (void)didEndSessionWithError: (NSError *)error
{
	NSLog( @"Bluedot: Session ended in error" );
}



/*
 *  This method is passed the Zone information utilised by the Bluedot SDK.
 *
 *  Returning:
 *      Array of zones
 *          Array of strings identifying zone:
 *              name
 *              description
 *              ID
 */
- (void)didUpdateZoneInfo: (NSSet *)zones
{
	NSString *notification = [NSString stringWithFormat:@"Point service updated with %lu zones", (unsigned long)zones.count];
	NSLog(@"Bluedot: %@",notification);
}



/*
 *  A fence with a Custom Action has been checked into.
 *
 *  Returns the following multipart status:
 *      Array identifying fence:
 *          name (String)
 *          description (String)
 *      Array of strings identifying zone:
 *          name (String)
 *          description (String)
 *          ID (String)
 *      Array of double values identifying location:
 *          Date of check-in (Integer - UNIX timestamp)
 *          Latitude of check-in (Double)
 *          Longitude of check-in (Double)
 *          Bearing of check-in (Double)
 *          Speed of check-in (Double)
 *      Fence is awaiting check-out (BOOL)
 *      Custom fields setup in the <b>Point Access</b> web-interface.</p>
 */
- (void)didCheckIntoFence: (BDFenceInfo *)fence
									 inZone: (BDZoneInfo *)zone
							 atLocation: (BDLocationInfo *)location
						 willCheckOut: (BOOL)willCheckOut
					 withCustomData: (NSDictionary *)customData
{
  /**
   * Fetch all the keys and names from the NSUserDefaults singleton
   */
  NSString *apiKey = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointApiKey"];
  NSString *packageName = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointPackageName"];
  NSString *username = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointUsername"];
  
  NSString *notification = [NSString stringWithFormat:@"Bluedot: Fence check-in triggered: %@ | %@ ", zone.name, fence.name];
  [self sendEventWithName:@"Notification" body:notification];
  
  BDZoneEvent *zoneEvent = [BDZoneEvent build:^(id<BDZoneEventBuilder> builder) {
    [builder setSalesforceSubscriberKey:[[ETPush pushManager] getSubscriberKey]];
    [builder setApiKey:apiKey];
    [builder setZoneId:zone.ID];
    [builder setZoneName:zone.name];
    [builder setPackageName:packageName];
    [builder setUserName:username];
    [builder setFenceId:fence.ID];
    [builder setFenceName:fence.name];
    [builder setCheckInTime:[self get8601formattedDate]];
    [builder setCheckInLatitude:[NSNumber numberWithDouble:location.latitude]];
    [builder setCheckInLongitude:[NSNumber numberWithDouble:location.longitude]];
    [builder setCheckInBearing:[NSNumber numberWithDouble:location.bearing]];
    [builder setCheckInSpeed:[NSNumber numberWithDouble:location.speed]];
    [builder setCustomData:customData];
  }];

  [[BDZoneEventReporter sharedInstance] reportCheckInWithBDZoneEvent: zoneEvent];
}

#pragma mark BDPLocationDelegate
- (NSString *)get8601formattedDate
{
  NSDateFormatter *dateFormatter = [[NSDateFormatter alloc] init];
  NSLocale *enUSPOSIXLocale = [NSLocale localeWithLocaleIdentifier:@"en_US_POSIX"];
  [dateFormatter setLocale:enUSPOSIXLocale];
  [dateFormatter setDateFormat:@"yyyy-MM-dd'T'HH:mm:ssZZZZZ"];
  
  NSDate *now = [NSDate date];
  NSString *iso8601String = [dateFormatter stringFromDate:now];
  
  return iso8601String;
}

/*
 *  A fence with a Custom Action has been checked out of.
 *
 *  Returns the following multipart status:
 *      Array identifying fence:
 *          name (String)
 *          description (String)
 *      Array of strings identifying zone:
 *          name (String)
 *          description (String)
 *          ID (String)
 *      Date of check-out (Integer - UNIX timestamp)
 *      Dwell time in minutes (Unsigned integer)
 */
- (void)didCheckOutFromFence: (BDFenceInfo *)fence
											inZone: (BDZoneInfo *)zone
											onDate: (NSDate *)date
								withDuration: (NSUInteger)checkedInDuration
							withCustomData: (NSDictionary *)customData
{
  /**
   * Fetch all the keys and names from the NSUserDefaults singleton
   */
  NSString *apiKey = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointApiKey"];
  NSString *packageName = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointPackageName"];
  NSString *username = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointUsername"];
  
	NSString *notification = [NSString stringWithFormat:@"Bluedot: Fence check-out triggered: %@ | %@", zone.name, fence.name];
	[self sendEventWithName:@"Notification" body:notification];
  
  BDZoneEvent *zoneEvent = [BDZoneEvent build:^(id<BDZoneEventBuilder> builder) {
    [builder setSalesforceSubscriberKey:[[ETPush pushManager] getSubscriberKey]];
    [builder setApiKey:apiKey];
    [builder setZoneId:zone.ID];
    [builder setZoneName:zone.name];
    [builder setPackageName:packageName];
    [builder setUserName:username];
    [builder setFenceId:fence.ID];
    [builder setFenceName:fence.name];
    [builder setCheckOutTime:[self get8601formattedDate]];
    [builder setDwellTime:[NSNumber numberWithInt:checkedInDuration]];
    [builder setCustomData:customData];
  }];
  [[BDZoneEventReporter sharedInstance] reportCheckOutWithBDZoneEvent: zoneEvent];
}

/*
 *  A beacon with a Custom Action has been checked into.
 *
 *  Returns the following multipart status:
 *      Array identifying beacon:
 *          name (String)
 *          description (String)
 *          proximity UUID (String)
 *          major (Integer)
 *          minor (Integer)
 *          latitude (Double)
 *          longitude (Double)
 *      Array of strings identifying zone:
 *          name (String)
 *          description (String)
 *          ID (String)
 *      Array of double values identifying location:
 *          Date of check-in (Integer - UNIX timestamp)
 *          Latitude of beacon setting (Double)
 *          Longitude of beacon setting (Double)
 *          Bearing of beacon setting (Double)
 *          Speed of beacon setting (Double)
 *      Proximity of check-in to beacon (Integer)
 *          0 = Unknown
 *          1 = Immediate
 *          2 = Near
 *          3 = Far
 *      Beacon is awaiting check-out (BOOL)
 *      Custom fields setup in the <b>Point Access</b> web-interface.</p>
 */
- (void)didCheckIntoBeacon: (BDBeaconInfo *)beacon
										inZone: (BDZoneInfo *)zone
								atLocation: (BDLocationInfo *)location
						 withProximity: (CLProximity)proximity
							willCheckOut: (BOOL)willCheckOut
						withCustomData: (NSDictionary *)customData
{
  /**
   * Fetch all the keys and names from the NSUserDefaults singleton
   */
  NSString *apiKey = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointApiKey"];
  NSString *packageName = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointPackageName"];
  NSString *username = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointUsername"];
  
	NSString *notification = [NSString stringWithFormat:@"Bluedot: Beacon check-in triggered: %@ | %@", zone.name, beacon.name];
	[self sendEventWithName:@"Notification" body:notification];
  
  BDZoneEvent *zoneEvent = [BDZoneEvent build:^(id<BDZoneEventBuilder> builder) {
    [builder setSalesforceSubscriberKey:[[ETPush pushManager] getSubscriberKey]];
    [builder setApiKey:apiKey];
    [builder setZoneId:zone.ID];
    [builder setZoneName:zone.name];
    [builder setPackageName:packageName];
    [builder setUserName:username];
    [builder setBeaconId:beacon.ID];
    [builder setBeaconName:beacon.name];
    [builder setCheckInTime:[self get8601formattedDate]];
    [builder setCheckInLatitude:[NSNumber numberWithDouble:location.latitude]];
    [builder setCheckInLongitude:[NSNumber numberWithDouble:location.longitude]];
    [builder setCheckInBearing:[NSNumber numberWithDouble:location.bearing]];
    [builder setCheckInSpeed:[NSNumber numberWithDouble:location.speed]];
    [builder setCustomData:customData];
  }];
  [[BDZoneEventReporter sharedInstance] reportCheckInWithBDZoneEvent: zoneEvent];
}

/*
 *  A beacon with a Custom Action has been checked out of.
 *
 *  Returns the following multipart status:
 *      Array identifying beacon:
 *          name (String)
 *          description (String)
 *          proximity UUID (String)
 *          major (Integer)
 *          minor (Integer)
 *          latitude (Double)
 *          longitude (Double)
 *      Array of strings identifying zone:
 *          name (String)
 *          description (String)
 *          ID (String)
 *      Proximity of check-in to beacon (Integer)
 *          0 = Unknown
 *          1 = Immediate
 *          2 = Near
 *          3 = Far
 *      Date of check-in (Integer - UNIX timestamp)
 *      Dwell time in minutes (Unsigned integer)
 */
- (void)didCheckOutFromBeacon: (BDBeaconInfo *)beacon
											 inZone: (BDZoneInfo *)zone
								withProximity: (CLProximity)proximity
											 onDate: (NSDate *)date
								 withDuration: (NSUInteger)checkedInDuration
							 withCustomData: (NSDictionary *)customData
{
  /**
   * Fetch all the keys and names from the NSUserDefaults singleton
   */
  NSString *apiKey = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointApiKey"];
  NSString *packageName = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointPackageName"];
  NSString *username = [[NSUserDefaults standardUserDefaults] valueForKey:@"sBDPointUsername"];

	NSString *notification = [NSString stringWithFormat:@"Bluedot: Beacon check-out triggered: %@ | %@", zone.name, beacon.name];
	[self sendEventWithName:@"Notification" body:notification];
  
  BDZoneEvent *zoneEvent = [BDZoneEvent build:^(id<BDZoneEventBuilder> builder) {
    [builder setSalesforceSubscriberKey:[[ETPush pushManager] getSubscriberKey]];
    [builder setApiKey:apiKey];
    [builder setZoneId:zone.ID];
    [builder setZoneName:zone.name];
    [builder setPackageName:packageName];
    [builder setUserName:username];
    [builder setBeaconId:beacon.ID];
    [builder setBeaconName:beacon.name];
    [builder setCheckOutTime:[self get8601formattedDate]];
    [builder setDwellTime:[NSNumber numberWithInt:checkedInDuration]];
    [builder setCustomData:customData];
  }];
  
  [[BDZoneEventReporter sharedInstance] reportCheckOutWithBDZoneEvent: zoneEvent];
}

/*
 *  This method is part of the Bluedot location delegate and is called when Bluetooth is required by the SDK but is not
 *  enabled on the device; requiring user intervention.
 */
- (void)didStartRequiringUserInterventionForBluetooth
{
		NSLog( @"Bluedot: There are nearby Beacons which cannot be detected because Bluetooth is disabled."
					"Re-enable Bluetooth to restore full functionality." );
}

/*
 *  This method is part of the Bluedot location delegate; it is called if user intervention on the device had previously
 *  been required to enable Bluetooth and either user intervention has enabled Bluetooth or the Bluetooth service is
 *  no longer required.
 */
- (void)didStopRequiringUserInterventionForBluetooth
{
	NSLog( @"Bluedot: User intervention for Bluetooth is no longer required." );
}

/*
 *  This method is part of the Bluedot location delegate and is called when Location Services are not enabled
 *  on the device; requiring user intervention.
 */
- (void)didStartRequiringUserInterventionForLocationServicesAuthorizationStatus: (CLAuthorizationStatus)authorizationStatus
{
	NSLog( @"Bluedot: Location services required." );
}

/*
 *  This method is part of the Bluedot location delegate; it is called if user intervention on the device had previously
 *  been required to enable Location Services and either Location Services has been enabled or the user is no longer
 *  within an authenticated session, thereby no longer requiring Location Services.
 */
- (void)didStopRequiringUserInterventionForLocationServicesAuthorizationStatus: (CLAuthorizationStatus)authorizationStatus
{
	NSLog( @"Bluedot: User intervention for location services is no longer required" );
}



#pragma mark BDPointDelegate implementation end



/*
 *  Return an array with extrapolated zone details into Cordova variable types.
 */
- (NSArray *)zoneToArray: (BDZoneInfo *)zone
{
		NSMutableArray  *strings = [ NSMutableArray new ];

		[ strings addObject: zone.name ];
		[ strings addObject: ( zone.description == nil ) ? @"" : zone.description ];
		[ strings addObject: zone.ID ];

		return strings;
}

/*
 *  Return an array with extrapolated fence details into Cordova variable types.
 *      Array identifying fence:
 *          name (String)
 *          description (String)
 *          ID (String)
 */
- (NSArray *)fenceToArray: (BDFenceInfo *)fence
{
		NSMutableArray  *strings = [ NSMutableArray new ];

		[ strings addObject: fence.name ];
		[ strings addObject: ( fence.description == nil ) ? @"" : fence.description ];
		[ strings addObject: fence.ID ];

		return strings;
}

/*
 *  Return an array with extrapolated beacon details into Cordova variable types.
 *      Array identifying beacon:
 *          name (String)
 *          description (String)
 *          ID (String)
 *          isiBeacon (BOOL)
 *          proximity UUID (String)
 *          major (Integer)
 *          minor (Integer)
 *          MAC address (String)
 *          latitude (Double)
 *          longitude (Double)
 */
- (NSArray *)beaconToArray: (BDBeaconInfo *)beacon
{
		NSMutableArray  *objs = [ NSMutableArray new ];

		[ objs addObject: beacon.name ];
		[ objs addObject: ( beacon.description == nil ) ? @"" : beacon.description ];
		[ objs addObject: beacon.ID ];

		[ objs addObject: @(YES) ];
		[ objs addObject: beacon.proximityUuid ];
		[ objs addObject: @( beacon.major ) ];
		[ objs addObject: @( beacon.minor ) ];

		//  Arrays cannot contain nil, add an NSNULL object
		[ objs addObject: [ NSNull null ] ];

		[ objs addObject: @( beacon.location.latitude ) ];
		[ objs addObject: @( beacon.location.longitude ) ];

		return objs;
}

/*
 *  Return an array with extrapolated location details into Cordova variable types.
 *      Array identifying location:
 *          Date of check-in (Integer - UNIX timestamp)
 *          Latitude of check-in (Double)
 *          Longitude of check-in (Double)
 *          Bearing of check-in (Double)
 *          Speed of check-in (Double)
 */
- (NSArray *)locationToArray: (BDLocationInfo *)location
{
		NSMutableArray  *doubles = [ NSMutableArray new ];
		
		NSTimeInterval  unixDate = [ location.timestamp timeIntervalSince1970 ];
		[ doubles addObject: @( unixDate ) ];
		[ doubles addObject: @( location.latitude ) ];
		[ doubles addObject: @( location.longitude ) ];
		[ doubles addObject: @( location.bearing ) ];
		[ doubles addObject: @( location.speed ) ];
		
		return doubles;
}

#pragma mark BDPZoneEventReporterDelegate
- (void)reportSuccessful
{
  NSString *notification = [NSString stringWithFormat:@"BDPZoneEventReporterDelegate report successful"];
  [self sendEventWithName:@"Notification" body:notification];
}

- (void)reportFailedWithError:(NSError *)error
{
  NSString *notification = [NSString stringWithFormat:@"BDPZoneEventReporterDelegate report errored"];
  [self sendEventWithName:@"Notification" body:notification];
  
  NSLog(@"BDPZoneEventReporterDelegate report unsuccessful %@", error);
  RCTLogInfo(@"BDPZoneEventReporterDelegate report unsuccessful %@", error);
}


@end
