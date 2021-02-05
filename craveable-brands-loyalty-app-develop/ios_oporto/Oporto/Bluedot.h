#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import "KeyInfo.h"

@interface Bluedot : RCTEventEmitter <RCTBridgeModule>

@property (nonatomic, retain) KeyInfo *m_keyInfo;

@end
