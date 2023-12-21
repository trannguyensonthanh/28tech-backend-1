const SettingGeneral = require("../../models/settings-general.model")

//[get]  /admin/settings/general
module.exports.general = async (req, res) => {
const settingGeneral = await SettingGeneral.findOne({});

  res.render("admin/pages/settings/general", {
     pageTitle: "cài đặt chung",
     settingGeneral: settingGeneral
  })
}

//[patch]  /admin/settings/general
module.exports.generalPatch = async (req, res) => {
  const settingGeneral = await SettingGeneral.findOne({});
  if (!settingGeneral) {
    const record = new SettingGeneral(req.body);
await record.save();
  }
  else {
    await SettingGeneral.updateOne({
      _id: settingGeneral.id
    }, req.body);
  }
  req.flash("success", "Cập nhật thành công");
res.redirect("back");
}