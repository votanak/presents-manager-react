export const sendOrder = async (req, res) => {
  try {
    jsonToWb(
      JSON.parse(req.body.selectedGoods),
      req.body.giftId,
      req.body.customer,
    ).xlsx.writeFile(`./data/order_${req.body.giftId}.xlsx`);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'telek.kanatov@gmail.com',
        pass: 'glhu dwbo fuhe xivd',
      },
    });

    const mail_configs = {
      from: 'gk-konfi',
      to: 'gvotanak@gmail.com',
      subject: 'Заказ на сборный подарок',
      text: `Поступил заказ на сборный подарок от пользователя ${req.body.customer.name} c электронным адресом ${req.body.customer.email}\nКомментарий: ${req.body.customer.message}`,
      attachments: [
        {
          filename: `order_${req.body.giftId}.xlsx`,
          path: `./data/order_${req.body.giftId}.xlsx`,
        },
      ],
    };

    const info = await transporter.sendMail(mail_configs);

    // Удаление файла после успешной отправки
    fs.unlink(`./data/order_${req.body.giftId}.xlsx`, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });

    return res.send({ info });
  } catch (error) {
    return res
      .status(500)
      .send({ error: 'Произошла ошибка при выполнении запроса' });
  }
};
