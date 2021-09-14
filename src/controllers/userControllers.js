import User from "../models/User";

export const getjoin = (req, res) => res.render("join", {pageTitle: "Join"});
export const postjoin = async(req, res) => {
  const {name, username, email, password, location} = req.body;
  await User.create({
    name,
    username,
    email,
    password,
    location,
  });
  return res.redirect("/login");
};
export const edit = (req,res) => res.send("Edit User");
export const remove = (req,res) => res.send("Remove User");
export const login = (req,res) => res.send("Log in");
export const logout = (req, res) => res.send("Log out")
export const see = (req,res) => res.send("See User");