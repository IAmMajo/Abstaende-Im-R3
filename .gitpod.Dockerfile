FROM gitpod/workspace-base:2023-05-09-03-02-39

USER gitpod

ENV VOLTA_HOME=/workspace/.volta

ENV PATH="$VOLTA_HOME/bin:$PATH"
