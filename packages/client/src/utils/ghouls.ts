import { ethers } from "ethers";

export const ghoulsSlotOf = (tokenId) => ethers.utils.keccak256(
  ethers.utils.solidityPack(
    ['uint256', 'uint256'],
    [tokenId, 103]
  )
)

export const ghoulsAddress = '0xeF1a89cbfAbE59397FfdA11Fc5DF293E9bC5Db90';
