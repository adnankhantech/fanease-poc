export function _getVideoSrc(deviceService) {
    const checkIfMobileDevice = deviceService.getDeviceInfo().userAgent.match(/iPhone/) != null;
    if (checkIfMobileDevice) {
      return 'https://d3bvzl6owxj5uv.cloudfront.net/output_third.mov';
    } else {
      return 'https://d3bvzl6owxj5uv.cloudfront.net/XFL-Roughnecks.mp4';
    }
}
