import useAxiosApi from "@/utils/useAxiosApi";
// const urlApi = import.meta.env.VITE_API;
const urlApi = (window as any).BASEURL;

// 获取版本号
export function getVersion() {
  return useAxiosApi(`${urlApi}/v1/version`, { method: "GET" });
}
// 查询链列表
export function getChains() {
  return useAxiosApi(`${urlApi}/v1/chains`, { method: "GET" });
}

//获取 铸造资产列表 数据
export function getTableList(params: any, apiURL: any) {
  return useAxiosApi(`${urlApi}${apiURL}`, {
    method: "GET",
    params
  });
}

//获取 详情 数据
export function getNftDetails(apiUrl: any) {
  return useAxiosApi(`${urlApi}${apiUrl}`, {
    method: "GET"
  });
}

//获取 活动日志 数据
export function getActivityLog(chainId: any, tokenId: any, owner: any, params: any) {
  return useAxiosApi(`${urlApi}/v1/events/${chainId}/${tokenId}/${owner}`, {
    method: "GET",
    headers: {},
    params
  });
}

// /**
//  * @Descripttion: 查询回调参数
//  * @returns UseAxiosReturn
//  */
// export function callbackChainWalletAddressBySaltRandom(data: AnyObject) {
//   return useAxiosApi(`${urlApi}/v1/callback/${data.saltRandom}`, {
//     method: "get"
//   });
// }

/**
 * @Descripttion: 销毁 NFT
 * @returns UseAxiosReturn
 */
export function destroyedAsset(data: any) {
  return useAxiosApi(`${urlApi}/v1/asset`, {
    method: "PUT",
    data
  });
}

/**
 * @Descripttion: 铸造 NFT
 * @returns UseAxiosReturn
 */
export function createAsset(data: any) {
  return useAxiosApi(`${urlApi}/v1/nft`, {
    method: "POST",
    data
  });
}

/**
 * @Descripttion: 删除 NFT
 * @returns UseAxiosReturn
 */
export function deleteAsset(id: any) {
  return useAxiosApi(`${urlApi}/v1/nfts/${id}`, {
    method: "DELETE"
  });
}

/**
 * @Descripttion: 编辑 NFT
 * @returns UseAxiosReturn
 */
export function updateAsset(id: any, data: any) {
  console.log(id, data);
  return useAxiosApi(`${urlApi}/v1/nfts/${id}`, {
    method: "PUT",
    data
  });
}

/**
 * @Descripttion: 发布 NFT
 * @returns UseAxiosReturn
 */
export function publicAsset(data: any) {
  return useAxiosApi(`${urlApi}/v1/asset`, {
    method: "POST",
    data
  });
}
