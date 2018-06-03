const fetch = require('node-fetch')
const config = require('../../config')

exports.githubLogin = async (ctx, next) => {
  const path = "https://github.com/login/oauth/authorize"
  const client_id = config.github.client_id
  
  ctx.redirect(`${path}?client_id=${client_id}`)
}

exports.githubCallback = async (ctx, next) => {
  const code = ctx.query.code
  let path = 'https://github.com/login/oauth/access_token'
  const params = {
    client_id: config.github.client_id,
    client_secret: config.github.client_secret,
    code: code
  }
  console.log(code)
  await fetch(path, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.text)
  .then(body => {
    console.log(body)
    // const args = body.split('&');
    // let arg = args[0].split('=');
    // const access_token = arg[1];
    // console.log(access_token);
    // return access_token;
  })
  .then(async (token) => {
    const url = ' https://api.github.com/user?access_token=' + token
    await fetch(url)
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res)
      })
  })
  .catch(e => {
    console.log(e)
  })
}