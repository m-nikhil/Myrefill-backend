const resetPasswordTemplate = (ses, otp, to) => {
  const data = `<!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="initial-scale=1.0">
      <meta name="format-detection" content="telephone=no">
      <title>Forgot Password</title>

      <style type="text/css">
        body{ margin: 0; padding: 0;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif; }
        img{ border: 0px; display: block; }

        .socialLinks{ font-size: 6px; }
        .socialLinks a{
          display: inline-block;
        }

        .long-text p{ margin: 1em 0px; }
        .long-text p:last-child{ margin-bottom: 0px; }
        .long-text p:first-child{ margin-top: 0px; }
      </style>
      <style type="text/css">
        /* yahoo, hotmail */
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{ line-height: 100%; }
        .yshortcuts a{ border-bottom: none !important; }
        .vb-outer{ min-width: 0 !important; }
        .RMsgBdy, .ExternalClass{
          width: 100%;
          background-color: #f4f4f4;
          background-color: #f4f4f4}

        /* outlook/office365 add buttons outside not-linked images and safari have 2px margin */
        [o365] button{ margin: 0 !important; }

        /* outlook */
        table{ mso-table-rspace: 0pt; mso-table-lspace: 0pt; }
        #outlook a{ padding: 0; }
        img{ outline: none; text-decoration: none; border: none; -ms-interpolation-mode: bicubic; }
        a img{ border: none; }

        @media screen and (max-width: 600px) {
          table.vb-container, table.vb-row{
            width: 95% !important;
          }

          .mobile-hide{ display: none !important; }
          .mobile-textcenter{ text-align: center !important; }

          .mobile-full{
            width: 100% !important;
            max-width: none !important;
          }
        }
        /* previously used also screen and (max-device-width: 600px) but Yahoo Mail doesn't support multiple queries */
      </style>
      <style type="text/css">

        #ko_footerBlock_2 .links-color a, #ko_footerBlock_2 .links-color a:link, #ko_footerBlock_2 .links-color a:visited, #ko_footerBlock_2 .links-color a:hover{
          color: #cccccc;
          color: #cccccc;
          text-decoration: underline
        }
        </style>

    </head>
    <body bgcolor="#f4f4f4" text="#919191" alink="#cccccc" vlink="#cccccc" style="margin: 0; padding: 0; background-color: #f4f4f4; color: #919191;"><center>

      <table width="100%" cellpadding="0" cellspacing="0" border="0" class="m_4162846291955858778background_main" style="background-color:#ffffff;padding-top:20px;color:#434245;width:100%">
        <tbody><tr>
          <td valign="top" class="m_4162846291955858778sm_full_width" style="margin:0 auto;width:100%;max-width:600px;display:block">
            <div class="m_4162846291955858778sm_no_padding" style="margin:0 auto;padding:30px 0 40px;display:block;box-sizing:border-box">

              <table style="width:100%;color:#434245" border="0" cellpadding="0" cellspacing="0">
                <tbody><tr>
                  <td style="box-sizing:border-box">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tbody><tr>
                        <td>

      <img style="width:200px;margin:0 0 15px 0;padding-right:30px;" alt="" width="200px" src="" class="CToWUd">
      <p style="    padding: 0px 0 10px 0;
      font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
      font-size: 22px;
      line-height: 26px;
      color: #444444;">We got your request to change your password!</p>


<table style="width:100%" class="m_4162846291955858778sm_table">
  <tbody><tr style="width:100%">
    <td style="width:100%">
      <span style="margin-left:20px;display:inline-block;border-radius:4px;font-size: 22px;" class="m_4162846291955858778sm_full_width">
        Your OTP : ${otp}
      </span>
    </td>
  </tr>
</tbody></table>


    <div style="padding-right:30px;padding-left:30px;margin-bottom:20px">


  </div>

    <p style="padding: 0px 0 0px 0;
    font-family: helvetica neue,helvetica,arial,sans-serif;
    font-size: 22px;
    line-height: 26px;
    color: #444444;">

    Just so you know: You have 15 mins to use this OTP for changing password. After that, you'll have to ask for a new one.
  </p>
  <p style="padding: 0px 0 0px 0;
  font-family: helvetica neue,helvetica,arial,sans-serif;
  font-size: 22px;
  line-height: 26px;
  color: #444444;">


    Didn't ask for a password change? You can ignore this email.
  </p>





    <hr style="display:block;height:1px;border:0;border-top:1px solid #e1e1e4;margin:30px;margin-left:0;">

    <p style="text-align: center;margin-bottom:0;">© ${new Date().getFullYear()} Refill. All rights reserved.

      </p>




    </center></body></html>`;
  var params = {
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Body: {
        Html: {
          Data: data,
          Charset: 'utf-8',
        }
      },
      Subject: {
        Data: 'Refill: Reset your Password',
        Charset: 'utf-8',
      },
    },
    Source: '',
  };
  ses.sendEmail(params, function(err, data) {
    if (err) console.log(err, err.stack);
    // an error occurred
    else console.log(data); // successful response
  });
};
exports.resetPasswordTemplate = resetPasswordTemplate;
