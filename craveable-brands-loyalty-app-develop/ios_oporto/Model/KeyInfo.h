//
//  KeyInfo
//
//  Created by Dennis O'Keeffe
//

#import <Foundation/Foundation.h>

@interface KeyInfo : NSObject

@property (nonatomic, assign) NSString *sBDPointApiKey;
@property (nonatomic, retain) NSString *sBDPointPackageName;
@property (nonatomic, retain) NSString *sBDPointUsername;

//@property (nonatomic, retain) NSString *sETDebugAppID;
//@property (nonatomic, retain) NSString *sETDebugAccessToken;
//@property (nonatomic, retain) NSString *sETProdAppID;
//@property (nonatomic, retain) NSString *sETProdAccessToken;

////////////////////////////////////Class Method////////////

/**
 *  Saving the user information.
 */
- (void)saveKeyInformation;

@end

