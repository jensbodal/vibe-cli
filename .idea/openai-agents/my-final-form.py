from agents import Agent, Runner, set_default_openai_api, set_default_openai_client
from agents.run import RunConfig
from openai import AsyncOpenAI

custom_client = AsyncOpenAI(base_url="http://0.0.0.0:4000", api_key="isk-1234")

set_default_openai_client(custom_client)
#set_default_openai_api("chat_completions")

agent = Agent(name="Assistant", model="simple", instructions="You are a helpful assistant")
disable_tracing_config = RunConfig(tracing_disabled=True)


result = Runner.run_sync(
        agent,
        "Write a haiku about recursion in programming.",
        config=disable_tracing_config # Pass the config here

)

print(result.final_output)
