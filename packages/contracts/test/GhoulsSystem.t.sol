// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "forge-std/Test.sol";
import { MudV2Test } from "@latticexyz/std-contracts/src/test/MudV2Test.t.sol";
import { getKeysWithValue } from "@latticexyz/world/src/modules/keyswithvalue/getKeysWithValue.sol";

import { IWorld } from "../src/codegen/world/IWorld.sol";

contract GhoulsSystemTest is MudV2Test {
  IWorld public world;

  function setUp() public override {
    super.setUp();
    world = IWorld(worldAddress);
  }

  function testClaimGhoul() public {
    bytes[] memory proof = new bytes[](9);
    proof[0] = hex"f90211a07fc79195b0532ea247ee4333e3a15505ffd6ed283a5c03de6c99352fe1b1f95aa0a79ce1646a239414b4b1c7e83f7def6988b4fed8050a38659dea5e17b1472960a0fadee4fd1c844eb65935eb092c2926721645163cb498b8c5735901fc733b883fa0743e11e5d25747de0c8510f67b4aeffd348cf2476cad2dc4a553b6cd42bf24d4a046dc95bdaaeb551118839262b7a71ba94f174ba87689b05bf5c1ce8fdf2a79cea04ca0bb8379b0b4ac07f095cd3f339cb9c307ff14a939f998e50c96d36cf671b9a0fe13dd4ddd1320b606172d602fc1710d410d1c8468492aedd117984b1c2a4be2a00daa87c18147050d505431287c745fa8f75332c19bfca3bd1f763724169e89c1a0ce1d63b348cdbf42b8085c824eec5ce8587d438c9cf5923040893be7f5b379d5a06cc093fd5db4203769676cb2eb1905d8d8fa0c9a5c548e7f0a123caaa0e670aca0f13193d0a62398f4310c580533429e31d68a1f8544b5a2b431ecee365418b0f5a0b504b84e02d2027fa374cb1e48bb9058a12f325ac94e1b1d3d3e8ca9051174fca0092ec023ca895335ab082668034c197e9638259f661c60c0cbfbfb998ef81965a0cd046f4b509440039376244a3d7db228e44f603420798d62aac0a3bbb39db420a0b4fb6704c942f239a92ee4403c664234a4ba0de85b627a058795baf5e980d2e6a04c57b113e226b31cb17e689e9ae11b010ccc579cf1d33da1feb77796397dcfa480";
    proof[1] = hex"f90211a03f34d0e457b851cb891161d9c78e81ced060e5126d490c7c7edabcb01c92df22a094e6a0065b326a077e346e9cc63c29e75a41bb661a007438ff3a955007376d71a0c6e92571d82bf8f7e73b4a59cf74ec0a29a2696a577f31f0a4c334d90703a3e6a063d1cf55bc0a3673e4c3419f28bb5db765d92b548f067d9570900b0cff29b7c3a0a6be3af607fd9e7d5d464c4be49a6707e8a51680367084064441b228b553f6d7a07fc88ba9ea01896a43295a10c4abcf1c3a94a8e5faace300b811b4c87f2e0179a0857888e837448daeb52e0616ffd3942ec2ff717d05c457a97780e48737c02856a0ac0f8ec5feb77561cf8e7bd81b4143f8837700ecdd6b47433b8e29231587ddb1a0eec83750204ebe638afa1b72532ef9fd5f9ed2f7a71f88d30125a49d666f0569a022cf3cb7303023c5ffa094e72e3965038140959e17f3b4631253126060d878e1a0ae5ed1509d6ef6c99c476db09e19c405127cc55267f05b47ef5dba255f84e0d4a07ad2ac94426e61e92ef115f95507dc4c0106efc93171c36c7ee3297f786a3440a02ae82225aac4ffdfb2a58dd630f48a4b7bff648fc15de3b631f5910390d1b845a07aa458942aebef015a822900de0bb4ecbdac9c26099373839fad6a303479c1f2a09757cfef794b62f534e5ac4be7f982ec48a44e8743465610073b278a35cf533fa0803207d40267ba615922178be357ae3ce9a32b49d285fc9bcc8d6b477c49e0b780";
    proof[2] = hex"f90211a049ab0757359255c3eaaff18ac463ee9aea7b61c516aa81f99ce0a2994d9f2c8da0a1bad9c2d8d4cb480ab081da0745d96c295780ab3e5a6bdd9215b54b8e3fced3a06ac901bf31aad460fe32de2e035d016d43ca3f30220645d70f27daf9bdde74c1a0ff2ef2f4ee0c8cce7ce24222f3b7c7dc93cb764ad70c0fbd021e0db8253d1f12a07c1f0762a4a196f7264c043a9db01916777ec3cbcadffdc9fbafff629f2b5a6ca0daaa930db44734d56cca252363b5a261e2f076f2657b33db23f470160f5a8e04a08257309a0f7086ab23343df05852fc3be34b4c62dd2214bc8f2a2542618542c0a0dd2413a2bfd07413ada18e4a4777be1d4acaa9711ad1dfbd39673b684379dcf6a009b73770359c05464939c37d728a1f1c364f46b90d63553c150d6896276aa1c2a0c9a436003c39664ccd3d53e93b2a2108535cae263eab878c011da4a0cf7a153aa06d708d527c7ca8203858c0150e60a60e51e2dcfdaae792c33f47ebfac0a06b2ba024e340032b20c154ae88793f164c1708f9643ac93cc86594975d18bd86a98ea7a05281783107a830a89df190e40d8da3862253a8a448f49edd817838440e91f126a00ab7a39dc574baf331a2f22d92ca043cf8461dfab1d19ef52c06636da76f30c0a057e21af6eb1fdc7bc028b7a78e8953e4fbcc5bb5240928dc4fb0c4aedbe6349aa049f12c6096b530843e32aa499d6428f13cb48f7bde353177be85709d57285d4c80";
    proof[3] = hex"f90211a0e2f731f14b3bd093f24cf559053fda7070e9809dca74be19832c8b507a95ce37a0d1f8c87d03398a17ad21c8cb03296993521ace572967e5d6032bb451358726cea04d03d7e2ef1fb67312d6eff0ba8325bb20c45dd4e3a0644a43748625075ed29ba0cadb2c5223d03132283272fafff8174dfd7d2a0ded2c77628a2436e5d27c8a1ca06b11a1ac5223d5121d1a4c0ab5a5129e0f9f92deb79a01e097ccd8691fca06fca01a21d4ee4d5383da4f841c3b6e2a2140a4cf3ff27f1f82c38069b3d9e2c95a3aa032084a0d0904231e2b0a8d8847832cba7e302dd9efa62ed7be608176edde4044a0670b72084b1c91c609ead0e0a0f4233b002218125279461a047a1b214b0923eca0b48b35b3ed2754b832eba96bb117729393f7d65978dab54e4ac03caaa94de4e6a0dc4b72031754adc41c5e0bc9708a2b0e25c20661f9baf8dea717babfe9683236a098b91bed77cdf3b3762bfe65b4c62d3bfdd7e4b5c3a7dd0ca6e276fa9ac762b3a0ec7d7551dd4cf86d48d11fead61ba824fb801dcf150a233c0bda9884622a2706a00e24bf43431d0708cf88327468c84d899008950afa5e252011809d7a5d66a1e8a044408bb0fcf624619e49902ca158c777a67b35e1aa55aeecec5046bac02d349ca09cf13c0160c4ce1b7d796b261a17c1e9645909781d325dd478d3538b4a2c6bf7a00ea68135703fea60b2006051f418fdb34d5e97646472bba47901dc7ea80e3a3180";
      proof[4] = hex"f90211a08b2c960c262f73eaaa48e83d7eef31e9fb824729cf240c931bd776a379915fe9a0c858e22f89b2c8b7526b5a3de99465cf652070e6f7e46ccdc4634295edb4c7f5a024f3960323e4d57d921ccdf52642049d1c207a48ca6553052d9d16d16bce265ba08f7fd7e0ac3860c85c4657439d5d5d9d0e085e854c97ec305967b41381107782a0977a981c41e0b036fd91b975ccb5dd479330c91f177e74ed959f9b5216b790aca064a4e714fc918fce055f0afec09b3b15049f28ba1d0b8410c0bc54ec57f15a0aa0e4e2cec8edf4291b02d30381e865341bfb62df0a6a4355fbae386bc34bd43e8ca0d44ad975641e7395dcf15f4c36df24a58baf666f99348f11cb542eb21014819ba07394fd3c82d46b1051bfd0c5e0b122f7af1728340251663d665ac473feddd1a8a037f263c6b31dbfc7ef371d2f3194f2e534467b26be22218f09f31cba29180f89a073cc544e7ad08d86e20565ea88b6e8719b8f401b7c0b0a1203a9246dba47b4b6a07dadbdb8de610293cbfe4bd90bbb4449460ed815f2bd3b0b39851b08ac0585d6a04789f4b7df81c051b0c5b137b1272b04a6d20887c2e14d6ca3c22e4db4555d09a0f21f68f613908721dca508bef4c37d57254036b563ffea7d185fa3f5d0bc5090a0739d9204a4843865245a739e2da0e5c42160d9959bd81f17c780a2328ddcb7baa0e29b0e0c0e6acbf53e20e4657fdfece1b83f906b9dd8db1e76b5a593a51b123880";
      proof[5] = hex"f90211a0e5624937fa9d0ead3808321ed374e7512ff69a68381d738e60151b1a72a0cd90a0eeb0e0346d5f307c3dc60139680de750ec6b01d0d6d337645761724dfbcac0aaa0cf8ca0cf86e4456526ef293d4fb2986805e09a41d92dc9552555a04a9c18ec29a01731f380ee871662a4b293fc340974cc2707b58177affc2807ff16823f950324a01d7f298d3d1750e175fca20cc382621caa0ca43a964e072e3d5bd5b9984cdb49a091a878122a0024410584a7bda41d8f6671bee87d8f079d892980c5624e6a2bc6a0c4ca22399f7ec8f83b58edee46830423771fe7e3486844f80a253cbc657ed61ca0af1260575ab5d34ebe0a2085868ff5e33b9f829e8be0b4c30231dbe446599a91a0d80f8172809757acbd6f4a1d96d234fdffccca9d8154fc3263be7eb207e58179a09dec534d70b7be23ec4b4cfef0d37717016907931682f294876fa070b544fbd1a06c4ab0133075cdbb85b555c17b4ae4bc36057621941cf438bc548a13ef3250a3a0004bb42cf4287f885dcd100a4e13c8f462096d8624ad9875e738049052a46092a0323ba01c8ea965bb3d9030a46e1de564c7e614562abbbd01f367a1336feadba0a0fc29808384baf3543693e6dc7d0a994f7b658ecd8a19ceb812f22ecde7bd5941a0c799a367dbe89aead9664e33178395e0b018b94dd7776337b37e7e1226480149a0d6644bd96d00df2c3c24a24ff52f03402698320b2996df1232f1057b2850453080";
      proof[6] = hex"f901718080a06e9fcbba09ff9058fc8fc74862f8dc146a4573e1e264234fe9b2006e1fe10925a09332a4320589d8bd45448efa663173a3fae6b068e0be2d17930211a719179a61a0fe740aef1b58ceb5781ea484993fb9ad979af8fe24f3c026e7fb5bbb67f5880480a0805b284fa5645f19100e113067cd7482f569774eafd4013a32efe5907c2e38c1a095d1ab927e55cda34129ca52b6ef7b4f8b33e3509d995d96ac0fc878efbda99380a0be9839f811ad4375710f3e809179fea8fe5a7c8ce272590a4c60922fac1e45d0a0fcfa105e8f687f0891d0e0648339e6b2b57dc133e62d403b05cfc9a6df27d9b0a0e466e98c7f4655b38c933fd0dbf652a2e65d3bfe18b9595338f4c603780b5057a0d0de9a01fe387acf8e33707f7d258b42f29175c3bbd977bdf707d4b67abed23e80a071637d30d71da9ec0801ef260c9d0f4b28fdac8dbe974991f3af734cb71f4593a0b2b7ab46fc19a03c27a1b8aa38f6b673490a99e628ff41a1b8cf5cd40fd62d2e80";
      proof[7] = hex"f8b1a0c9da175ff9a6e08c3eb0ef971eb3247989d7a66059dd3a4bcc3c04818705f5e480808080808080a0ac4c026968ff4224ef6b8634d99a9c5a80065df64439a3699b564e7a9e8ee086a0a73134651902bd9ac98d7637742a2cfb734ebe6fa4d8a4a3f31c55f5b158a1d1a0e53d2d471dd76907a1277fe58549072e197e5b4c53d95f75903afcce5d95e46aa09ff5c5a3c94453f57438e8e25186612b33f840162072d3c6f9ec380aa59882188080808080";
      proof[8] = hex"f8669d20335dbda2e4bdf45e301e7df441f20d340594e9730aa7d00270b7418cb846f8440180a054b446bd21833f70b901b5500c46a0643f24711dc529f79127be65b43c5b1b10a0fc1ea81db44e2de921b958dc92da921a18968ff3f3465bd475fb86dd1af03986";

    bytes[] memory storageProof = new bytes[](6);
    storageProof[0] = hex"f90211a0b42b47b521d706e31480e6cd5f824dc44e1c7e8de9de7dadd913b06aa23ea2a0a07a2d838706cfb15f2f38dfd344f9fbdc60a59e6af23f9bd321bfae350fc2c046a03a1c15cb1eb8784a598f21e6d82ad5dc3ec8bcbde7639a99277433b0dee771fea0706695332c7a676243785a01feef021ebb76b19773d5ed30030c744d11af6df1a037d752bb06883fe706e5552ebe6dc8f0a0662c0003b42b8f2e9aec3fd31c2298a0593bfd31724c754d8a77576479799d3e72983917dacf51958edffa9bcc840b53a0e2354713ec708dd66e855df9be9dda757f4354a4a2a408e02c08d115f8d4e302a0d0f6c256610945a677c1a09ce2c326f17133ceaefc47f9175160ca9aba6a3378a0ed1714788209444fd5ddf07f45e402942b3bf9dfeaa68240024caa3159693269a0f241952389ad968b92677794f3f5584f13fc1c830fdb2f2ccec9f3a7ef8e954aa09792be6cfba91d6d7df03fecea4bc5089f01e910e5846a97613f004b8b5a48d8a0ccc7945bbcde7caadeb89873630661d61e4ac2c1f34c88b22c2356dfd93a3bd5a04e74017f6f5489c99ee75c6e7d58009a9fb026b2db90f6b48a95f867640397d8a0b9fd9b3de227b5f97cd24dd3acdb5c5e5eaa69ad42641d12dcfee13c00fdf74aa00a70a96ee01d5dbdf8c6063bed5b18556c01e4bae4639ff3df4520906249c4e5a09a35323d3459176eb432599f03fcdb9762e8939106d9a9bdad219c3a897b9ba080";
    storageProof[1] = hex"f90211a01aadf87ee3c9440c6d75c43d73d299449a14ef1110104630a101e40cecb05f4ea009761f32869ca0f45b801192221f041a9c07938e9859fab7568799b6739c8abaa0d56cb1c7282e29f40f7904fb2f111a9914468bfe4f1bc70d2ab297a3733bd9efa08f4e2ce659f15ddb9d2881228796d98b0c0bec1d2c76e4901e7bb7650bb32f6da0f22fee035a82145f03431b4401822106281e320f2d5c25814e72f3bc73f9b3aca0912c29c07e3904cb968cf1881e9cf1198b00677a16d9548a9b6aa3bc6deb66a8a048d9e4275f62c8dc8ad3878dbc973043d4294b6a2a5b190f96482ea9fc6552b5a035248335546e4ccb7d3f295d0087f394c65a11a7c2c50afa8d2d6f5d4afdcc6ba090f779d402f97a71b677cadfd3966a8be7066777770c1ba8190099b07fdfb787a05284f86a6b49f722a42dc998fae9b43d827e77ceba9fe6b48b241cfe86831f86a01229667a0e88ae137ab7f8d916d72290e43de375badc1aa099e0b54cea79abeaa0d82d7a065cdba6ca7102197f1e3d443c3d681dda3c472b5edb932a24cfe4dd3ba05fd3d864493348e8ded2bedcaf2370ef8294f654ac0548f0bc35590c9817ae5ba02542ad6f06bc399b511ad3753fea51714ad3b108b1216c8c34f983288846838fa07a1c3e0942b1b54b5cea0aefb65cc84cc1118e52b96b3f105bf3029208b3b644a084e1729821f2d8da50cb262eb2774b44a108a701864bed156bd657571e7065a480";
    storageProof[2] = hex"f90211a075473be0d58abda4fb6f4b2762e31e21846a779f852139eb18552d99b519779fa0e02e84d721a56aa3168a8e0ea5499abeece6938f6695b1d8f8c413bec481898ea058b35f1446eb23616fc7015e1667a71e56a7076cdbe1d511a1cffe68ce739b75a02a1cb019734e950060876f2a479a34dcb0041d5c74bb534a5db07c94da1450fda0fbb8a46495c5e3ca60da812f72c0c393abf0adb661cfd54660340231278bef5aa086bafbf5dcb306ac2802c70c30bceeeaf6fce04896d183c64c77d2f51e083476a073c69f42e2c6299dc1cc222eb736afcd523b6e55a05323b4e1cfac20bf13bd97a0b0d1e3133965dd0d88acfd681b0d1f7fabb73cba5a4f56b00d1c6bd902527111a043b4447d5c2a1445126beed2164e399b4731fa77b501a34b6a1dd4e3d935765fa08d3ccc137261d9f4b9a52b4b3549050348838b96a7b7c2b8ce6693e0bac583a7a0129902a0313110646ec3d6492295ff2299b6b1f0dac575eb1ee5e9c95c37543ca02931d4eba8034557f6986c74a4b73f669c80906be7e1af3a1149531fe5f37c77a03f9b647ce59b955a11be83a17b2bc80ae4d6d8f27f97a9e5c6cfb266e824c118a0f959dbb66eb2d5fc969d68c48a984c26e98ca6e482cc77b346996ca78ea10233a0bf22593a349559f596fb67279703cf868c879ac938c428b9632ff5a5ffd32843a04753a0dcdd7388ff0e8d1f2bbd5ddf8ca27c34610304f0c3a1f25ced73cfd7f780";
    storageProof[3] = hex"f851808080808080a0e6dcb8c40f6aa6ad0785bed60833877cf27af634f43d101d56b7caba395133798080808080808080a041537058a23b3a6fabbfd41c335ba6b9379b91b3dd1307e57d15c761d87c9d4480";
    storageProof[4] = hex"f851a00ca64bc995c32ad1f932d9a3b91b9fa03edd6c74ba2576206569d502a12414518080808080808080a0a5db5e6312ed508404d59b8361d895cf1e7d33c6756c8676ecc2cfb834e7e4f080808080808080";
    storageProof[5] = hex"f59e380c531090b70571b4399f4b79395520acf3d7a0931cabac7c2fcce9a9c99594502fce03af4bfd3dc991a6f7d0523cb920e1dbc8";
    world.claimGhoul(0, 0, 5944, "", "", 0x54b446bd21833f70b901b5500c46a0643f24711dc529f79127be65b43c5b1b10, proof, storageProof);
  }
}
