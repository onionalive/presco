//
//  KeyInfo
//
//  Created by Dennis O'Keeffe
//

#import "KeyInfo.h"
#import <React/RCTConvert.h>
#import <React/RCTEventEmitter.h>

#define kDOCUMENTS_DIRECTORY  [NSHomeDirectory() stringByAppendingPathComponent:@"Documents"]

@implementation KeyInfo
@synthesize sBDPointApiKey;
@synthesize sBDPointPackageName;
@synthesize sBDPointUsername;
//@synthesize sETDebugAppID;
//@synthesize sETDebugAccessToken;
//@synthesize sETProdAppID;
//@synthesize sETProdAccessToken;

- (id)init
{
  if (self = [super init])
  {
    self.sBDPointApiKey = @"";
    self.sBDPointPackageName = @"";
    self.sBDPointUsername = @"";
//    self.sETDebugAppID = @"";
//    self.sETDebugAccessToken = @"";
//    self.sETProdAppID = @"";
//    self.sETProdAccessToken = @"";
  }
  return self;
}

#pragma mark -
#pragma mark Class Methods

- (void)saveKeyInformation
{
  NSString *sPath = [kDOCUMENTS_DIRECTORY stringByAppendingPathComponent:@"key_data.xml"];
  RCTLogInfo(@"key_data.xml path: %@", sPath);
  [NSKeyedArchiver archiveRootObject:self toFile:sPath];
}

#pragma mark -
#pragma mark NSCoding Methods

- (void)encodeWithCoder:(NSCoder *)aCoder
{
  [aCoder encodeObject:sBDPointApiKey forKey:@"sBDPointApiKey"];
  [aCoder encodeObject:sBDPointPackageName forKey:@"sBDPointPackageName"];
  [aCoder encodeObject:sBDPointUsername forKey:@"sBDPointUsername"];
  
//  [aCoder encodeObject:sETDebugAppID forKey:@"sETDebugAppID"];
//  [aCoder encodeObject:sETDebugAccessToken forKey:@"sETDebugAccessToken"];
//  [aCoder encodeObject:sETProdAppID forKey:@"sETProdAppID"];
//  [aCoder encodeObject:sETProdAccessToken forKey:@"sETProdAccessToken"];
}

- (id)initWithCoder:(NSCoder *)aDecoder
{
  if(self = [super init])
  {
    self.sBDPointApiKey = [aDecoder decodeObjectForKey:@"sBDPointApiKey"];
    self.sBDPointPackageName = [aDecoder decodeObjectForKey:@"sBDPointPackageName"];
    self.sBDPointUsername = [aDecoder decodeObjectForKey:@"sBDPointUsername"];
    
//    self.sETDebugAppID = [aDecoder decodeObjectForKey:@"sETDebugAppID"];
//    self.sETDebugAccessToken = [aDecoder decodeObjectForKey:@"sETDebugAccessToken"];
//    self.sETProdAppID = [aDecoder decodeObjectForKey:@"sETProdAppID"];
//    self.sETProdAccessToken = [aDecoder decodeObjectForKey:@"sETProdAccessToken"];
  }
  return self;
}

@end

