module.exports = {
  token: "ODUyMTYwMjYxODYyNzE5NTE4.YMCyFg.thUpje8vpHe74CBeOpljg2DacTI", //this token is invalid make sure you replace it with yours
  prefix: "-",
  supportServer: (code) => `https://discord.gg/${code}`,
  inviteURL: (id, permissions) => `https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=${permissions ? permissions : '8'}&scope=bot`,
}
