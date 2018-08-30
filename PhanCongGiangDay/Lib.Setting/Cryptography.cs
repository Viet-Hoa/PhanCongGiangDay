using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Lib.Setting
{
    public class Cryptography
    {
        #region MD5
        public static string EncryptMD5(string source)
        {
            using (MD5 md5Hash = MD5.Create())
            {
                return GetMd5Hash(md5Hash, source);
            }
        }

        static string GetMd5Hash(MD5 md5Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }
        #endregion

        #region encrypt/decrypt base 64
        public static string EncryptBase64(string message, string key = null)
        {
            try
            {
                key = key ?? "@.PhanCongGiangDay";

                byte[] results;
                UTF8Encoding utf8 = new UTF8Encoding();

                // Step 1. We hash the passphrase using MD5
                // We use the MD5 hash generator as the result is a 128 bit byte array
                // which is a valid length for the TripleDES encoder we use below

                MD5CryptoServiceProvider hashProvider = new MD5CryptoServiceProvider();
                byte[] tdesKey = hashProvider.ComputeHash(utf8.GetBytes(key));

                // Step 2. Create a new TripleDESCryptoServiceProvider object
                TripleDESCryptoServiceProvider tdesAlgorithm = new TripleDESCryptoServiceProvider();

                // Step 3. Setup the encoder
                tdesAlgorithm.Key = tdesKey;
                tdesAlgorithm.Mode = CipherMode.ECB;
                tdesAlgorithm.Padding = PaddingMode.PKCS7;

                // Step 4. Convert the input string to a byte[]
                byte[] dataToEncrypt = utf8.GetBytes(message);

                // Step 5. Attempt to encrypt the string
                try
                {
                    ICryptoTransform encryptor = tdesAlgorithm.CreateEncryptor();
                    results = encryptor.TransformFinalBlock(dataToEncrypt, 0, dataToEncrypt.Length);
                }
                finally
                {
                    // Clear the TripleDes and Hashprovider services of any sensitive information
                    tdesAlgorithm.Clear();
                    hashProvider.Clear();
                }

                // Step 6. Return the encrypted string as a base64 encoded string
                return Convert.ToBase64String(results);
            }
            catch
            {
                return string.Empty;
            }
        }

        public static string DecryptBase64(string message, string key = null)
        {
            try
            {
                key = key ?? "@.PhanCongGiangDay";

                byte[] results;
                UTF8Encoding UTF8 = new UTF8Encoding();

                // Step 1. We hash the passphrase using MD5
                // We use the MD5 hash generator as the result is a 128 bit byte array
                // which is a valid length for the TripleDES encoder we use below

                MD5CryptoServiceProvider hashProvider = new MD5CryptoServiceProvider();
                byte[] tdesKey = hashProvider.ComputeHash(UTF8.GetBytes(key));

                // Step 2. Create a new TripleDESCryptoServiceProvider object
                TripleDESCryptoServiceProvider tdesAlgorithm = new TripleDESCryptoServiceProvider();

                // Step 3. Setup the decoder
                tdesAlgorithm.Key = tdesKey;
                tdesAlgorithm.Mode = CipherMode.ECB;
                tdesAlgorithm.Padding = PaddingMode.PKCS7;

                // Step 4. Convert the input string to a byte[]
                byte[] dataToDecrypt = Convert.FromBase64String(message);

                // Step 5. Attempt to decrypt the string
                try
                {
                    ICryptoTransform decryptor = tdesAlgorithm.CreateDecryptor();
                    results = decryptor.TransformFinalBlock(dataToDecrypt, 0, dataToDecrypt.Length);
                }
                finally
                {
                    // Clear the TripleDes and Hashprovider services of any sensitive information
                    tdesAlgorithm.Clear();
                    hashProvider.Clear();
                }

                // Step 6. Return the decrypted string in UTF8 format
                return UTF8.GetString(results);
            }
            catch
            {
                return string.Empty;
            }
        }
        #endregion

        #region encode/decode base64
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
        }
        #endregion
    }
}
