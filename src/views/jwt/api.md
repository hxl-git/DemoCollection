## jwt - api
***

* 安装 jsrsasign
``` bash
 网速快: npm run jsrsasign

 网速慢: npm run jsrsasign --registry=https://registry.npm.taobao.org
```

* 引用
``` bash
import jwt from 'jsrsasign'
```

***

* 秘钥 -  公钥(一般给需要解密的人) , 私钥 (自己保存)
``` bash
  const rsaKeypair = jwt.KEYUTIL.generateKeypair('RSA',1024);
  const PUBLIC = jwt.KEYUTIL.getPEM(rsaKeypair.prvKeyObj);  //获取公钥
  const PRIVATE = jwt.KEYUTIL.getPEM(rsaKeypair.prvKeyObj,'PKCS8PRV');  //获取私钥

  私钥 内容 (模拟)
  -----BEGIN PRIVATE KEY-----
  MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALy7NFRdnZWThQY8
  N4KwE1ZjAOEWweC1u4HGrQ4jWMrQIeaWnuGMGKb2+f7M/x/0OWE7BtP8wHiK+p2U
  IlPmFH/RsPjDHEywyTLuTxl0LAsVYaqiaJokfyuLiHaudPJw10+ThRfHQDGoOjUe
  ON//F6ozxlTf2XSlXF/kcfSJ1zFdAgMBAAECgYA7qzQwOCjKUYmNHxytxN1YQpTU
  lU1Wrh5KOXYdMi+wb31IWfaBeLmSkCMZ29YNVDmP9AmEnDR95/K0P1FbFTMFarSQ
  G/kFGvGMO4PefbfJdF17sYPvKNbiknv6oBMIHllrybtCVXMWK3NESKeg+LY+8hpf
  TsW6jzyEXvtfstcAAQJBAPH+GEcQhEvg++9JqyXVusdQ5QHER0AJLGl6mzzVWBNf
  WVcHz5cVu3kaBJdNBDqc+Ygqp5WcHSAcfA8TNIlKUV0CQQDHp97lfwTWGPQ3KXu6
  lxCyzF9wBDEg4JrKsir2GauL57m0yp/zaPvWDTcZ2cAWbb7/giiIDWMfWu2TWNX3
  kmABAkBxtoEaA7znGxXH38o4wTI/rtet+NmyUZ05A5AnCemVUNzedKEr0d6CjaNS
  pbIzCMiJH+IX/4AAMuJpAxFQ4kdRAkB9zCLgPQkCERUHEKc56OcHkUfs32dJDNvb
  LSluiLwS2b2j0Su5BYPv2cHHEvE58IowmYUKPE0hO3yHo6ilZeABAkA6Mxa9Vk6C
  qRdFj7SgKMKNNoH3LcRuHA1C/9Bp5620vRHjqDk/or4htG8R2Kb8TQTYRtGN+BoA
  IEbNzEtm8cKx
  -----END PRIVATE KEY-----

  公钥 内容 (模拟)
  -----BEGIN PUBLIC KEY-----
  MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC8uzRUXZ2Vk4UGPDeCsBNWYwDh
  FsHgtbuBxq0OI1jK0CHmlp7hjBim9vn+zP8f9DlhOwbT/MB4ivqdlCJT5hR/0bD4
  wxxMsMky7k8ZdCwLFWGqomiaJH8ri4h2rnTycNdPk4UXx0AxqDo1Hjjf/xeqM8ZU
  39l0pVxf5HH0idcxXQIDAQAB
  -----END PUBLIC KEY-----
```

***




