export function _getVideoSrc(deviceService) {
    const checkIfMobileDevice = deviceService.getDeviceInfo().userAgent.match(/iPhone/) != null;
    if (checkIfMobileDevice) {
      return 'https://d3bvzl6owxj5uv.cloudfront.net/XFL-Roughnecks.mp4';
    } else {
      return 'https://d3bvzl6owxj5uv.cloudfront.net/XFL-Roughnecks.mp4';
    }
}
