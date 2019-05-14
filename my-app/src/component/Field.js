import React from 'react';

function Field() {
    return (
        <div class="field">

            <p class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Username" />
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </p>
        </div>
    )
}

export { Field }