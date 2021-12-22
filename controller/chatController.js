const { Chat } = require("../models");

class chatController {
  static async sendMessages(req, res) {
    const { to, message } = req.body;
    const { id_user } = req.headers;
    try {
      await Chat.create({
        from: id_user,
        to,
        message,
        status: "unread",
      });
      res.status(201).json({ msg: "Chat is sent successfully" });
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  static async getConversationById(req, res) {
    const { id } = req.params;
    const { id_user } = req.headers;

    try {
      const messages1 = await Chat.findAll({
        where: {
          from: id_user,
          to: id,
        },
      });
      const messages2 = await Chat.findAll({
        where: {
          from: id,
          to: id_user,
        },
      });
      const conv = [...messages1, ...messages2].sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      });
      const unread = conv.filter(
        (el) => el.status === "unread" && el.from == id
      );

      await Chat.update(
        { status: "read" },
        {
          where: {
            id: unread.map((el) => el.id),
          },
        }
      );
      const response = {
        conversation: conv,
        unread: unread.length,
      };

      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  }

  static async readAllConversations(req, res) {
    const { id_user } = req.headers;
    const response = [];

    try {
      const messages1 = await Chat.findAll({
        where: {
          from: id_user,
        },
      });
      const messages2 = await Chat.findAll({
        where: {
          to: id_user,
        },
      });
      const conv = [...messages1, ...messages2].sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      });

      for (let i = 0; i < conv.length; i++) {
        let index;
        let temp;
        if (conv[i].from == id_user) {
          temp = response.filter((el, j) => {
            if (el.user === conv[i].to) {
              index = j;
            }
            return el.user === conv[i].to;
          });
          if (temp.length > 0) {
            response[index].conversations.push(conv[i]);
          } else {
            response.push({
              user: conv[i].to,
              conversations: [conv[i]],
            });
          }
        } else if (conv[i].to == id_user) {
          temp = response.filter((el, j) => {
            if (el.user === conv[i].from) {
              index = j;
            }
            return el.user === conv[i].from;
          });
          if (temp.length > 0) {
            response[index].conversations.push(conv[i]);
          } else {
            response.push({
              user: conv[i].from,
              conversations: [conv[i]],
            });
          }
        }
      }
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({msg: "Internal Server Error"})
    }
  }
}

module.exports = chatController;
