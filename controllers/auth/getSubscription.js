const { User, updateSubscriptionSchema } = require("../../models/user");
const { RequestError } = require("../../helpers");

const getSubscription = async (req, res) => {
  const { error } = updateSubscriptionSchema.validate(req.body);

  if (error) {
    const error = new Error("missing field subscription");
    error.status = 400;
    throw error;
  }

  const { _id } = req.user;
  const { subscription } = req.body;
  if (!["starter", "pro", "business"].some((e) => e === subscription)) {
    throw RequestError(400);
  }
  const result = await User.findByIdAndUpdate(
    _id,
    { subscription: subscription },
    { new: true }
  );

  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = getSubscription;
