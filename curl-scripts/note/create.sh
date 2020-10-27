API="http://localhost:4741"
URL_PATH="/note"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "note": {
      "restaurant": "'"${RESTAURANT}"'",
      "cuisine": "'"${CUISINE}"'",
      "address":"'"${ADDRESS}"'",
      "phone":"'"${PHONE}"'"
    }
  }'

echo
