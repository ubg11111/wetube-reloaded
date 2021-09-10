import Video from "../models/Video"

export const home = async(req, res) =>{
    const videos = await Video.find({});
    console.log(videos);
    return res.render("home", {pageTitle: "Good Your Home", videos});
};

export const watch = async(req,res) => {
  const { id }= req.params;
  const video = await Video.findById(id);
  if(!video){
    return res.render("404", {pageTitle: "Video Not Found"});
  }
  return res.render("watch", {pageTitle: video.title, video});
};

export const getEdit = async (req, res) => {
  const { id }= req.params;
  const video = await Video.findById(id);
  if(!video){
    return res.render("404", {pageTitle: "Video Not Found"});
  }
  return res.render("edit", {pageTitle: `Edti ${video.title}`, video});
};

export const postEdit = async(req, res) => {
  const { id }= req.params;
  const {title, description, hashtags} = req.body;
  const video = await Video.findById(id);
  if(!video){
    return res.render("404", {pageTitle: "Video Not Found"});
  }
  await video.findByIdAndUpdate(id);
  video.title = title;
  video.description = description;
  video.hashtags = hashtags.split(",").map((word) => 
  (word.startsWith("#") ? word : `#${word}`));
  await video.save(); 
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req,res) => {
  return res.render("upload", {pageTitle: "Video Upload"});
};

export const postUpload = async (req, res) => {
  const { title,  description, hashtags} = req.body;
  try{
    await Video.create({
      title,
      description,
      hashtags: hashtags.split(",").map((word) =>
      (word.startsWith("#") ? word : `#${word}`)),
    });
  return res.redirect("/");
  } catch(error){
    return res.render
    ("upload", {pageTitle: "Video Upload", errorMessage: error._message,});
  }
};
