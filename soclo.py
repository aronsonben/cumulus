### Unrelated Python script to test if client_id works (8/15//18) ###
import soundcloud

client = soundcloud.Client(client_id="PmqbpuYsHUQ7ZYrW6qUlPcdpVFETRzc0")

tracks = client.get('/tracks', limit=10)

for track in tracks:
    print track.title

# current_user = client.get('/me')
# print current_user.username

app = client.get('/apps/124')
print app.permalink_url