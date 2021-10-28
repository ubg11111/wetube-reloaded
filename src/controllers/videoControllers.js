import { compareSync } from "bcrypt";
import Video from "../models/Video"
import User from "../models/User"


// sort 정렬에 관한 기능 desc 오름차순 , asc 내림차순 
// createdAT(날짜) 오브젝트를 통해 기능 활성화
export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ createdAT: "desc" }).populate("owner");
  return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async (req, res) => {
  const { id } = req.params;
  /* populate를 사용하여 owner(ObjectId)값을 mongoose가 vidoe를 찾고
  그 안에서 owner도 찾아주는 기능을 함 */
  const video = await Video.findById(id).populate("owner");
  console.log(video);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const { user: { _id } } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  return res.render("edit", { pageTitle: `Edti ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  const { user: { _id } } = req.session;
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Video Upload" });
};

export const postUpload = async (req, res) => {
  const { user: { _id }, } = req.session;
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render(
      ("upload", { pageTitle: "Video Upload", errorMessage: error._message, }));
  }
};


export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const { user: { _id } } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video Not Found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }
  await Video.findByIdAndDelete(id); // 되도록이면 Delete 기능을 사용
  return res.redirect("/");
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(`${keyword}$`),
      },
    });
    console.log(videos);
  }
  return res.render("search", { pageTitle: "Search", videos });
};
