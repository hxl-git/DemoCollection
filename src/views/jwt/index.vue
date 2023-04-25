<template>
  <div id="ly-ui">
    <el-card class="box-card">
      <div>token: <el-input
        type="textarea"
        :rows="8"
        placeholder="请输入token"
        v-model="casToken">
      </el-input></div>
      <el-button type="primary" @click="init">解析</el-button>
    </el-card>
    <el-card class="box-card">
      <div>isValid: {{isValid}}</div>
      <div>header: {{header}}</div>
      <div>payload: {{payload}}</div>
    </el-card>
  </div>
</template>

<script>
import jwt from 'jsrsasign'

export default {
  name: 'home',
  data () {
    return {
      isValid:false,
      header:'',
      payload:'',
      casToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOjEsInJuU3RyIjoiSDVrZW5JTFRZcE5Ydkl5Z09WSXpGekdhYk5QZTd0ZHMiLCJtYW5hZ2VySWQiOjEsInVzZXJuYW1lIjoiMDAwMDAwMDAiLCJuaWNrbmFtZSI6IjEyMyIsImVtYWlsIjoiMTIzIiwiZGVwYXJ0bWVudCI6IjEyMyIsInBob25lIjoiMTIzIiwicm9sZXMiOlt7ImlkIjoxLCJjb2RlIjoiYWRtaW4iLCJuYW1lIjoi566h55CG5ZGYIiwiZGVzY3JpcHRpb24iOiLnrqHnkIblkZgiLCJyZXNvdXJjZXMiOlt7ImlkIjo2LCJuYW1lIjoicGFnZSIsImxhYmVsIjoibWFuYWdlciIsInR5cGUiOiJwYWdlIiwiZGVzY3JpcHRpb24iOiLkurrlkZjnrqHnkIYifSx7ImlkIjoxMiwibmFtZSI6InBhZ2UiLCJsYWJlbCI6InJvbGUiLCJ0eXBlIjoicGFnZSIsImRlc2NyaXB0aW9uIjoi6KeS6Imy566h55CGIn0seyJpZCI6MTgsIm5hbWUiOiJwYWdlIiwibGFiZWwiOiJ1c2VyLXR5cGUiLCJ0eXBlIjoicGFnZSIsImRlc2NyaXB0aW9uIjoi55So5oi357G75Z6LIn0seyJpZCI6MjQsIm5hbWUiOiJwYWdlIiwibGFiZWwiOiJ1c2VyLXNlY3JldC1rZXktbmVnb3RpYXRpb24tbG9nIiwidHlwZSI6InBhZ2UiLCJkZXNjcmlwdGlvbiI6IuWvhumSpeeuoeeQhiJ9LHsiaWQiOjI5LCJuYW1lIjoicGFnZSIsImxhYmVsIjoicm9vdC1jZXJ0IiwidHlwZSI6InBhZ2UiLCJkZXNjcmlwdGlvbiI6IuagueivgeS5pueuoeeQhiJ9LHsiaWQiOjM0LCJuYW1lIjoicGFnZSIsImxhYmVsIjoiZW50ZXJwcmlzZSIsInR5cGUiOiJwYWdlIiwiZGVzY3JpcHRpb24iOiLlrqLmiLfnrqHnkIYifV0sImNyZWF0ZWRBdCI6MTY4MDA3NTgzMywidXBkYXRlZEF0IjoxNjgwNTg2OTg4fV19.rmBcPi4JnKVegP7z1dbpu_xw03cc2fL08LPvN4x-GW8'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      /*
       // 这里 想了解嘻嘻 哥哥在教
        //1.0 公钥 当您有PEM证书的字符串时，您可以通过以下方法加载公钥对象
      const certificate = ''
      // const pubkey = jwt.KEYUTIL.getKey(certificate);

      // 2.0 于最简单的HS256 JWT验证，并验证签名、时间（即用“exp”、“nbf”和“iat”声明对当前时间排序）是否存在“jti”声明和可接受的算法   返回值 true (验证正确) false (错误的token,或者过期 不可用)
      const isValid = jwt.KJUR.jws.JWS.verify(this.token, pubKey, {alg: ['HS256']});
      console.log(isValid)
      */
      const pubKey = ''

      // verify 验证  拿公钥解析 token是否合法 是否过期 是否被污染等
      this.isValid = jwt.KJUR.jws.JWS.verify(this.casToken, pubKey, ['HS256'])
      console.log(this.isValid)
      this.payload = ''
      this.header = ''
      if (this.casToken.indexOf('.') > -1){
        // 解密
        this.header = jwt.KJUR.jws.JWS.readSafeJSONString(this.transformation(this.casToken.split('.')[0]))
        console.log(this.header)
        this.payload = jwt.KJUR.jws.JWS.readSafeJSONString(this.transformation(this.casToken.split('.')[1]))

        console.log(this.payload)
      }


      const rsaKeypair = jwt.KEYUTIL.generateKeypair('RSA',1024);
      const PUBLIC = jwt.KEYUTIL.getPEM(rsaKeypair.prvKeyObj);  //获取公钥
      const PRIVATE = jwt.KEYUTIL.getPEM(rsaKeypair.prvKeyObj,'PKCS8PRV');  //获取私钥

      console.log(rsaKeypair)
      console.log(PUBLIC)
      console.log(PRIVATE)

      var prv = jwt.KEYUTIL.getKey(PUBLIC);   //传入公钥
      var iis  = prv.encrypt('黄祥龙');  //加密
      console.log('iis', iis)


      prv = jwt.KEYUTIL.getKey(PRIVATE);  //传入私钥
      var keyStr = prv.decrypt(iis);
      console.log('keyStr', keyStr)
    },
    transformation (b64) {
      return decodeURIComponent(escape(window.atob(b64)))
    }
  }
}
</script>

<style lang="scss" scoped>
#ly-ui {
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    text-align: left;
  }
}

</style>
